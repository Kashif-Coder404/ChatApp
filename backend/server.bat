@echo off
:: Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: ---- YOU ARE ADMIN NOW ----
echo Running Flask server as Administrator...

cd /d "D:\Coding\React\first-vite-react\backend"
color 02
python server.py

pause
