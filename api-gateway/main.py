from fastapi import FastAPI, Request, Response
import integrations.link_generator as link_generator



app = FastAPI()


@app.get("/links-generator/health")
def health_check(fullRequest: Request):
    response = link_generator.health(fullRequest.headers)
    return requests_to_fastapi_response(response)





def requests_to_fastapi_response(response):
    return Response(
        content=response.content,
        status_code=response.status_code,
        headers=dict(response.headers)
    )





@app.api_route("/{path:path}", methods=["*"])
async def proxy(request: Request, path: str):
    target = pick_service(request.url.path)
    if not target:
        return Response("No route", status_code=404)
    resp = requests.request(
        request.method, target,
        params=request.query_params, data=await request.body(),
        headers={k: v for k, v in request.headers.items() if k.lower() != "host"}
    )
    return Response(resp.content, status_code=resp.status_code, headers=dict(resp.headers))




def pick_service(path: str) -> str | None:
    if path.startswith("/users"):
        return f"http://users:8000{path}"
    if path.startswith("/orders"):
        return f"http://orders:9000{path}"
    if path.startswith("/ai"):
        return f"http://ai:7000{path}"
    return None
