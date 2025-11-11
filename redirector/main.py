from fastapi import FastAPI, Response

app = FastAPI()

@app.get("/api/links/{url_id}")
def redirect(url_id: str):
    # print(url_id)
    long_url = "https://www.google.com/"
    return Response(
        status_code=302,
        headers={"Location": long_url}
    )