import requests
import utils

ip = "localhost"
port = 8001


def health(headers):
    endpoint = "health"
    url = f"https://{ip}:{port}/{endpoint}"
    headers = utils.remove_host_fiels(headers)
    response = requests.get(url=url, headers=headers)
    return response




def get_links(headers, limit):
    endpoint = "health"
    url = f"https://{ip}:{port}/{endpoint}"
    headers = utils.remove_host_fiels(headers)
    response = requests.get(url=url, headers=headers)
    return response




@app.get("/api/links")
def get_links(limit: int = 5):
    links = database.get_links(limit)
    return links



