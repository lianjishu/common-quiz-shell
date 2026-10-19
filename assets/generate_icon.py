"""Generate Electron app icon: teal background + 'C' letter + 5 theme color blocks."""
from PIL import Image, ImageDraw, ImageFont
import os

SIZE = 1024
BG = '#0F766E'  # teal
ACCENT = '#FAFAF9'  # cream
THEMES = [
    ('#7C3AED', '极光紫'),
    ('#2563EB', '极简线性'),
    ('#FFE066', '新粗野'),
    ('#D97706', '手绘线稿'),
    ('#5EEAD4', '细线留白'),  # lighter teal for contrast on teal bg
]

def find_font(size):
    candidates = [
        'C:/Windows/Fonts/segoeuib.ttf',
        'C:/Windows/Fonts/georgiab.ttf',
        'C:/Windows/Fonts/timesbd.ttf',
        'C:/Windows/Fonts/arialbd.ttf',
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def draw_icon(size, with_bg=True, for_ico=False):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if with_bg:
        # Rounded square background
        d.rounded_rectangle([0, 0, size, size], radius=int(size * 0.18), fill=BG)

    # 'C' letter — large, bold, centered
    font_c = find_font(int(size * 0.62))
    bbox = d.textbbox((0, 0), 'C', font=font_c)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    cx = (size - tw) // 2 - bbox[0]
    cy = (size - th) // 2 - bbox[1] - int(size * 0.05)
    d.text((cx, cy), 'C', font=font_c, fill=ACCENT)

    # 5 theme color blocks at bottom (rounded squares in a row)
    block_h = int(size * 0.09)
    block_w = int(size * 0.13)
    gap = int(size * 0.025)
    total = 5 * block_w + 4 * gap
    start_x = (size - total) // 2
    y = int(size * 0.78)
    for i, (color, _) in enumerate(THEMES):
        x = start_x + i * (block_w + gap)
        d.rounded_rectangle(
            [x, y, x + block_w, y + block_h],
            radius=int(block_h * 0.2),
            fill=color,
            outline=ACCENT,
            width=max(2, int(size * 0.004))
        )
    return img

os.makedirs('electron/assets', exist_ok=True)

# Main PNG (1024x1024)
png = draw_icon(1024)
png.save('electron/assets/icon.png', 'PNG')
print('icon.png  1024x1024')

# Various sizes for ICO (electron-builder requires >= 256x256)
imgs = [draw_icon(s, for_ico=True) for s in [16, 32, 48, 64, 128, 256]]
# PIL ICO writer: pass largest as primary, rest as append_images
imgs[-1].save(
    'electron/assets/icon.ico',
    format='ICO',
    sizes=[(s, s) for s in [16, 32, 48, 64, 128, 256]],
    append_images=imgs[:-1]
)
print('icon.ico  16..256 multi-size')

# PNG exports
for s in [256, 128, 64, 32]:
    draw_icon(s).save(f'electron/assets/icon-{s}.png', 'PNG')
    print(f'icon-{s}.png')
