from fastapi import FastAPI, HTTPException, Response
import database

app = FastAPI()

@app.get("/api/links/{url_id}")
def redirect(url_id: str):
    try:
        long_url = database.get_long_url(url_id)
    except KeyError:
        raise HTTPException(status_code=404, detail=f"That url_id of {url_id} not found. It is either stale and was removed, or never was added.")

    # handle error
    return Response(
        status_code=302,
        headers={"Location": long_url}
    )