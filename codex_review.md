# Database (`db/`)

- `db/docker-compose.yml` (line 3) pins to `mongo:latest`, so every docker pull can silently upgrade you to a new MongoDB major version; lock it to a tested tag (e.g. `mongo:7.0`) and add restart / health checks so the dependency is reproducible.  
- There is no authentication or separate network in the compose file, so the database is exposed on localhost (`27017`) with default credentials. Even for practice it is worth adding `MONGO_INITDB_ROOT_USERNAME` / `PASSWORD` and binding to an internal network only.  
- The `mongo-data/` directory under `db/` is checked into the repo, which will quickly bloat Git history and leak any sample data. Add it to the top-level `.gitignore` and keep volumes outside the project tree.

# Link generator service (`links-generator/`)

- The dependency list (`requirements.txt` (lines 1–5)) only contains generic HTTP libraries, so a fresh install will fail immediately because FastAPI, Uvicorn, and PyMongo are absent. Regenerate the file from the virtualenv or maintain it with Poetry/pip-tools.  
- The Mongo connection details and TTL are hard-coded at import time (`database.py` (lines 3–12)). That makes local/prod parity difficult and forces you to edit code for every environment. Consider loading them from env vars and lazily creating clients so tests can mock them.  
- `ttl_seconds` is set to 3600 seconds (1 hour) while the UI tells users links survive 24 hours (`database.py` line 6 vs `web-front-mui/src/ResultCard.tsx` line 39). Fix one of them.  
- Mongo calls are issued directly from async FastAPI handlers (`main.py` lines 41–52). PyMongo is synchronous, so each request blocks the event loop. Use `motor` or `run_in_threadpool`.  
- `asyncio.sleep(2)` at the end of `generate_link_connection` (`main.py` line 47) slows every request. Drop it or guard behind an env flag.  
- The request-logging middleware dumps every header/body to stdout (`main.py` lines 24–33). Fine locally, unsafe elsewhere—guard behind an env flag or logging levels.  
- `LongUrl.long_url` is a plain string. Use `HttpUrl` or validate schemes.  
- ID space is tiny (`id_generator.py` lines 12–22): only **6,760** possible IDs. Use base62 or larger alphabet.  
- The admin endpoint (`main.py` lines 61–64) exposes all links without auth/pagination. Protect it.

# Redirector service (`redirector/`)

- Same synchronous PyMongo issue (`database.py` lines 7–13); switch to async driver or threadpool.  
- `database.get_long_url` only handles “not found” (`database.py` lines 11–14). Unexpected errors become silent 500s. Wrap unexpected exceptions and log them.  
- Redirect endpoint builds a 302 manually (`main.py` lines 14–16). Use FastAPI’s `RedirectResponse`.  
- No URL validation on creation → open-redirect vulnerability (`javascript:`, `file://`). Validate schemes.

# API gateway (`api-gateway-nginx/`)

- Proxy targets use `host.docker.internal` (`nginx.conf` lines 21–32). Works only on Docker Desktop. Use an internal Docker network and container names.  
- Frontend bypasses the gateway by calling generator directly on port 8002—terminating all public traffic at nginx would allow TLS, rate limiting, and monitoring.  
- No caching/throttling/logging settings in `nginx.conf`. Add `limit_req_zone`, gzip, structured access logs, etc.

# Web front-end (`web-front-mui/`)

- Backend URLs hard-coded in `useBackend.ts` (lines 17–34). Move to env vars (`import.meta.env`) and point to gateway.  
- Short URL constructed manually (`useBackend.ts` lines 33–34). Should rely on what API returns.  
- Input validation is minimal (`App3.tsx` lines 16–23). Validate URLs properly; disable submit while loading.  
- `main.tsx` still imports/commented legacy components—remove stale code.  
- `package.json` pins everything to `"latest"`—dangerous. Lock versions or commit lockfile.  
- Tailwind imported globally (`src/index.css` line 1) but unused—remove it.  
- UI says “24 hours” TTL (`ResultCard.tsx` line 39) but backend uses 1 hour—fix mismatch.

# System architecture

- Splitting generator/redirector is a good microservice exercise, but both duplicate schema and connection code. Extract shared env contract or shared library.  
- Only DB and nginx run in containers; APIs and frontend run manually. Add a top-level `docker-compose.yml` to orchestrate all services.  
- Service-to-service discovery is hard-coded to localhost ports. Centralize config via env vars.  
- No unified logging/monitoring: inconsistent stdout prints, missing access logs, generic frontend errors. Add structured logs + correlation IDs.  
- Security: no auth, rate limiting, or validation; attackers can spam link creation or redirect malicious URLs. Add minimal guards.