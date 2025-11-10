@echo off
echo ============================================================
echo   Analise de Usabilidade - FalaAtipica
echo ============================================================
echo.

REM Mudar para o diretório do script
cd /d "%~dp0"

REM Verificar qual comando Python funciona
set PYTHON_CMD=
python --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python
    goto :found_python
)

py --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=py
    goto :found_python
)

python3 --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python3
    goto :found_python
)

echo [ERRO] Python nao esta instalado ou nao esta no PATH
echo Por favor, instale Python 3: https://www.python.org/downloads/
pause
exit /b 1

:found_python
echo [OK] Python encontrado: %PYTHON_CMD%
echo.

REM Verificar e instalar dependências
echo [INFO] Verificando dependencias...
echo.

%PYTHON_CMD% -c "import pandas" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Instalando pandas...
    %PYTHON_CMD% -m pip install pandas --user
)

%PYTHON_CMD% -c "import openpyxl" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Instalando openpyxl...
    %PYTHON_CMD% -m pip install openpyxl --user
)

%PYTHON_CMD% -c "import bs4" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Instalando beautifulsoup4...
    %PYTHON_CMD% -m pip install beautifulsoup4 --user
)

%PYTHON_CMD% -c "import matplotlib" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Instalando matplotlib...
    %PYTHON_CMD% -m pip install matplotlib --user
)

%PYTHON_CMD% -c "import numpy" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Instalando numpy...
    %PYTHON_CMD% -m pip install numpy --user
)

echo.
echo [OK] Dependencias verificadas
echo.
echo Executando analise de usabilidade...
echo.

REM Executar o script Python
%PYTHON_CMD% analise-usabilidade.py

echo.
pause

