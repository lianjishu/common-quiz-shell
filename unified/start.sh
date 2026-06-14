#!/bin/sh

echo
echo "============================================"
echo "  计组练习统一版 - 本地服务器"
echo "============================================"
echo
echo "  服务地址: http://localhost:8000/index.html"
echo "  按 Ctrl+C 停止服务"
echo "============================================"
echo

# 检查 Python 是否可用
if ! command -v python3 >/dev/null 2>&1; then
    if ! command -v python >/dev/null 2>&1; then
        echo "[错误] 未检测到 Python"
        echo "请安装 Python 3："
        echo "  macOS:   brew install python3"
        echo "  Ubuntu:  sudo apt install python3"
        exit 1
    fi
    PYTHON=python
else
    PYTHON=python3
fi

# 后台启动 HTTP 服务器
$PYTHON -m http.server 8000 &
SERVER_PID=$!

# 等待服务器就绪
sleep 2

# 打开浏览器
URL="http://localhost:8000/index.html"
if command -v open >/dev/null 2>&1; then
    open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL"
fi

echo "服务器运行中... 按 Ctrl+C 停止。"

# 等待 Ctrl+C
trap "kill $SERVER_PID 2>/dev/null; echo '已停止。'; exit 0" INT TERM
wait $SERVER_PID
