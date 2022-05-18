FROM python:3.10.4-alpine3.15
ENV PYTHONUNBUFFERED=1
WORKDIR /django
COPY requirements.txt requirements.txt
RUN apk update 
RUN apk add --no-cache postgresql-libs
RUN apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev
RUN apk add -u zlib-dev jpeg-dev gcc musl-dev
RUN pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt --no-cache-dir
RUN apk --purge del .build-deps

RUN mkdir -p data/db/

COPY . .
