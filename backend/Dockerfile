FROM python:3.12-slim-trixie
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ADD . /app/

ENV UV_LINK_MODE=copy

RUN uv sync --locked

CMD ["uv", "run", "api/manage.py", "runserver", "0.0.0.0:8000"]
