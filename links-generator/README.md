
cd links-generator

python -m venv venv

venv\Scripts\activate

pip freeze > requirements.txt

uvicorn main:app --port 8002 --reload


curl -X GET http://localhost:8002/health

curl -X POST http://localhost:8002/api/links -H "Content-Type: application/json" -d "{\"long_url\":\"https://www.google.com/\"}"

curl -X GET http://localhost:8002/api/links?limit=3
