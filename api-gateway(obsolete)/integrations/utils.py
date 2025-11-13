

def remove_host_fiels(headers):
    return {k: v for k, v in headers.items() if k.lower() != "host"}