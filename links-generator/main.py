import asyncio
from datetime import datetime, timezone
from fastapi import FastAPI, Request
from pydantic import BaseModel
import id_generator
import database
from fastapi.middleware.cors import CORSMiddleware


class LongUrl(BaseModel):
    long_url: str
    

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] while dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    # """ logging the whole request:
    body = await request.body()
    print(f"REQUEST: {request.method} {request.url}")
    print(f"Headers: {dict(request.headers)}")
    print(f"Body: {body.decode(errors='ignore')}")
    # """
    response = await call_next(request)
    return response


@app.get("/health")
def health_check():
    return {"message": "Server is healthy"}


@app.post("/api/links")
async def generate_link_connection(body: LongUrl):
    id = id_generator.generate_id()
    url = body.long_url
    creation_time = datetime.now(timezone.utc)
    database.add_link(id, url, creation_time)
    await asyncio.sleep(2)  # non-blocking
    return {
        "message": "Link created successfully",
        "id": id,
        "url": url,
        "created_at": creation_time.isoformat()
    }





############### ADMIN ###############

@app.get("/api/links")
def get_links(limit: int = 5):
    links = database.get_links(limit)
    return links