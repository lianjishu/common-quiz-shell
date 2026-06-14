#!/bin/sh

echo
echo "============================================"
echo "  计组练习统一版 - 本地服务器"
echo "============================================"
echo
echo "  服务地址: http://localhost:8000/"
echo "  统一版入口: http://localhost:8000/index.html"
echo
echo "  按 Ctrl+C 停止服务"
echo "============================================"
echo

# 检查 Python 是否可用
if ! command -v python3 >/dev/null 2>&1; then
    if ! command -v python >/dev/null 2>&1; then
        echo "[错误] 未检测到 Python"
        echo
        echo "请先安装 Python 3："
        echo "  macOS:   brew install python3"
        echo "  Ubuntu:  sudo apt install python3"
        echo "  Windows: 请使用 start.bat 或安装 Python"
        exit 1
    fi
    PYTHON=python
else
    PYTHON=python3
fi

# 自动打开浏览器（macOS 用 open，Linux 用 xdg-open）
URL="http://localhost:8000/index.html"
if command -v open >/dev/null 2>&1; then
    open "$URL" &
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL" &
fi

# 启动 HTTP 服务
$PYTHON -m http.server 8000
