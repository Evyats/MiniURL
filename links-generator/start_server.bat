set PORT=8002

cd /d "%~dp0"
call venv\Scripts\activate
uvicorn main:app --port %PORT% --reload