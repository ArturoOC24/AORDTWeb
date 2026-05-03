@echo off
title AOR Dyno Tuning - Dev Server
color 0A

echo.
echo  ================================================
echo   AOR Dyno Tuning ^| Local Dev Server
echo  ================================================
echo.

:: ── Try Python 3 first, then Python 2 ──
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Python no encontrado. Instala Python desde python.org
    echo.
    pause
    exit /b 1
)

:: Pick a port
set PORT=8080

:: Check if port is already in use
netstat -an | find ":%PORT% " | find "LISTENING" >nul 2>&1
if %errorlevel% == 0 (
    echo  [WARN] Puerto %PORT% ocupado. Usando 8081...
    set PORT=8081
)

echo  Sirviendo en:  http://localhost:%PORT%
echo  Directorio:    %~dp0
echo.
echo  Paginas disponibles:
echo    http://localhost:%PORT%/
echo    http://localhost:%PORT%/calculadora.html
echo    http://localhost:%PORT%/vin.html
echo    http://localhost:%PORT%/pcm.html
echo.
echo  Presiona Ctrl+C para detener el servidor.
echo  ================================================
echo.

:: Open browser after a short delay (runs in background)
start "" cmd /c "timeout /t 1 >nul & start http://localhost:%PORT%/"

:: Change to project directory and start server
cd /d "%~dp0"
python -m http.server %PORT%

pause
