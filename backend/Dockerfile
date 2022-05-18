FROM python:3.10.4-alpine3.15
ENV PYTHONUNBUFFERED=1
WORKDIR /django
COPY . .
RUN apk update 
RUN apk add --no-cache postgresql-libs
RUN apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev
RUN apk add -u zlib-dev jpeg-dev gcc musl-dev
RUN python3 -m pip install -r requirements.txt --no-cache-dir
RUN apk --purge del .build-deps

RUN mkdir -p data/db/

RUN cp custom/commands/wait_for_db.py /usr/local/lib/python3.10/site-packages/django/core/management/commands/


