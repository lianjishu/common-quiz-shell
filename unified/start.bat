@echo off
chcp 65001 >nul
title 计组练习 统一版 - 本地服务器

echo.
echo ============================================
echo   计组练习统一版 - 本地服务器
echo ============================================
echo.
echo   服务地址: http://localhost:8000/index.html
echo   按任意键停止服务
echo ============================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python
    echo 请安装 Python 3 并勾选 "Add Python to PATH"
    pause
    exit /b 1
)

REM 后台启动 HTTP 服务器
start /B python -m http.server 8000

REM 等待服务器就绪
timeout /t 2 /nobreak >nul

REM 打开浏览器
start "" "http://localhost:8000/index.html"

echo 服务器运行中... 按任意键停止。
pause >nul

REM 停止服务器
taskkill /F /IM python.exe >nul 2>nul
echo 已停止。
