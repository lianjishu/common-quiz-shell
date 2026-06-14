@echo off
chcp 65001 >nul
title 计组练习 统一版 - 本地服务器

echo.
echo ============================================
echo   计组练习统一版 - 本地服务器
echo ============================================
echo.
echo   服务地址: http://localhost:8000/
echo   统一版入口: http://localhost:8000/index.html
echo.
echo   按 Ctrl+C 停止服务
echo ============================================
echo.

REM 检查 Python 是否可用
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python
    echo.
    echo 请先安装 Python：
    echo   1. 访问 https://www.python.org/downloads/
    echo   2. 下载并安装 Python 3.x
    echo   3. 安装时勾选 "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

REM 自动打开浏览器
start "" "http://localhost:8000/index.html"

REM 启动 HTTP 服务
python -m http.server 8000
