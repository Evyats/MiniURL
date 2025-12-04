<img src="web-front-mui/src/assets/MiniUrl.png" width="320" style="background:white; padding:8px; border-radius:20px;" />

## Overview
Local Bitly-style stack:
- MongoDB (Docker, TTL index on links)
- FastAPI link generator (`links-generator`, port 8002) for creating/listing short links
- FastAPI redirector (`redirector`, port 8001) for 302 redirects to the long URL
- Nginx gateway (`api-gateway-nginx`, port 8004) proxying `/api/links` to the generator and `/` to the redirector
- React/Vite frontend (`web-front-mui`, port 5173)

## Prerequisites
- Docker & Docker Compose
- Python 3.11+ (FastAPI services)
- Node.js 18+ (frontend)

## First-time setup
- Python deps (run once per service):
```
cd links-generator
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn pymongo pydantic
```
Repeat in `redirector` with `venv-redirector` as the venv folder.

- Frontend deps:  
`npm --prefix web-front-mui install`

## Start all services (in order)
MongoDB:
`db\start_server.bat`

Link generator API (port 8002):
`links-generator\start_server.bat`

Redirector (port 8001):
`redirector\start_server.bat`

API gateway (port 8004):
`api-gateway-nginx\start_server.bat`

Frontend (port 5173):
`web-front-mui\start_server.bat`

## Access and quick checks
- App UI: http://localhost:5173/
- Health: `curl http://localhost:8002/health` or `curl http://localhost:8004/links-generator/health`
- Create short link:  
  `curl -X POST http://localhost:8002/api/links -H "Content-Type: application/json" -d "{\"long_url\":\"https://www.google.com/\"}"`
- List recent links: `curl http://localhost:8002/api/links?limit=3`
- Redirect with a returned id: open `http://localhost:8004/<id>`

## Screenshots
<img src="web-front-mui/src/assets/screenshots/Screenshot 2025-12-02 141459.png" width="320" alt="Landing and form" />
<img src="web-front-mui/src/assets/screenshots/Screenshot 2025-12-02 141542.png" width="320" alt="Short link result" />
<img src="web-front-mui/src/assets/screenshots/Screenshot 2025-12-02 141646.png" width="320" alt="Recent links table" />
