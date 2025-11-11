
cd links-generator

python -m venv venv

venv\Scripts\activate

pip freeze > requirements.txt



curl -X GET http://localhost:8000/health

curl -X POST http://localhost:8000/api/links -H "Content-Type: application/json" -d "{\"long_url\":\"google.com\"}"

curl -X GET http://localhost:8000/api/links?limit=3
