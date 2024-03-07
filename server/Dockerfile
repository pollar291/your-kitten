FROM python:3.9-alpine

WORKDIR /backend

ENV FLASK_APP=app.py

ENV FLASK_RUN_HOST=0.0.0.0

COPY requirements.txt /backend

RUN pip install -r requirements.txt

EXPOSE 5000

COPY .env /backend
COPY .flaskenv /backend
COPY app.py /backend
COPY queries.py /backend

CMD ["flask", "run"]