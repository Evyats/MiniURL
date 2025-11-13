set PORT=8003

cd /d "%~dp0"
call venv-gateway\Scripts\activate
uvicorn main:app --port %PORT% --reload