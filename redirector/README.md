python -m venv venv-redirector

venv-redirector\Scripts\activate

uvicorn main:app --port 8001 --reload

curl -X GET http://localhost:8001/api/links/asbdsfkj