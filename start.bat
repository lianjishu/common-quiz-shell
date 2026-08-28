@echo off
title Quiz Server - Review Hub

echo.
echo ============================================
echo   Review Quiz Hub - Local Server
echo ============================================
echo.
echo   URL: http://localhost:8000/
echo   Press any key to stop
echo ============================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python not found
    echo Please install Python 3 and add to PATH
    pause
    exit /b 1
)

start /B python -m http.server 8000
timeout /t 2 /nobreak >nul
start "" "http://localhost:8000/"

echo Server running... Press any key to stop.
pause >nul

taskkill /F /IM python.exe >nul 2>nul
echo Stopped.
