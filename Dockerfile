FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /app/