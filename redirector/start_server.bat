set PORT=8001

cd /d "%~dp0"
call venv-redirector\Scripts\activate
uvicorn main:app --port %PORT% --reload