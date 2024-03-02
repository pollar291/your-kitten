import os
import io
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, abort, make_response, Response, send_file, jsonify
import hashlib
import uuid
from queries import *
import magic
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

connection = psycopg2.connect(
    host=os.getenv("DATABASE_CONNECT"),
    port=os.getenv("DATABASE_PORT"),
    database=os.getenv("DATABASE_NAME"),
    user=os.getenv("DATABASE_USER"),
    password=os.getenv("DATABASE_PASSWORD"),
)


@app.route("/")
def index():
    return "Running"


# Сетевой запрос логина
@app.post("/auth")
def auth():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(FIND_USER_BY_EMAIL, [email])
            result = cursor.fetchone()
            if result is None:
                return {"error": "uncorrect_login_or_password"}, 422
            else:
                db_hash_password = result[2]
                login_hash_password = hashlib.md5(password.encode("utf-8")).hexdigest()
                if db_hash_password != login_hash_password:
                    return {"error": "uncorrect_login_or_password"}, 422
                else:
                    cursor.execute(AUTH_USER, (str(uuid.uuid4()), result[0]))
                    return {"uuid": cursor.fetchone()[0]}


# Регистрация
@app.post("/registration")
def registration():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    hash_password = hashlib.md5(password.encode("utf-8")).hexdigest()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(FIND_USER_BY_EMAIL, [email])
            result = cursor.fetchone()
            if result is None:
                cursor.execute(CREATE_USER, (email, hash_password))
                return {"id": cursor.fetchone()[0]}
            else:
                return {"error": "user_exists"}, 422


@app.post("/create_poster")
def create_poster():
    uuid = request.headers["token"]
    user_id = checkSession(uuid)
    if user_id is None:
        abort(401)
    else:
        data = request.get_json()
        title = data["title"]
        address = data["address"]
        phone = data["phone"]
        description = data["description"]
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(CREATE_POST, (title, address, phone, "NEW", description))
                resultPoster = cursor.fetchone()
                cursor.execute(CREATE_USER_POST, (user_id, resultPoster[0]))
                return {"id": cursor.fetchone()[0]}


@app.get("/get_posters")
def get_posters():
    limit = int(request.args.get("limit") or 15)
    offset = int(request.args.get("offset") or 0)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_POSTERS, [limit, offset])
            response = []
            for row in cursor.fetchall():
                response.append(
                    {
                        "id": row[0],
                        "title": row[1],
                        "address": row[2],
                        "phone": row[3],
                        "status": row[4],
                        "description": row[5],
                        "images": row[6],
                    }
                )
            return response


@app.get("/get_poster")
def get_poster():
    poster_id = request.args.get("poster_id")
    if poster_id is None:
        abort(404)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_POSTER, [poster_id])
            result = cursor.fetchone()
            return {
                "id": result[0],
                "title": result[1],
                "address": result[2],
                "phone": result[3],
                "status": result[4],
                "description": result[5],
                "images": result[6],
            }


@app.post("/load_poster_image")
def loadPosterImage():
    uuid = request.headers["token"]
    user_id = checkSession(uuid)
    if user_id is None:
        abort(401)
    else:
        poster_id = request.form.get("poster_id")
        image_files = request.files.getlist("file[]")
        print("" + str(image_files))
        with connection:
            with connection.cursor() as cursor:
                ids = []
                for image_file in image_files:
                    image = image_file.read()
                    mimeType = str(magic.from_buffer(image, mime=True))
                    cursor.execute(CREATE_POSTER_IMAGE, (poster_id, image, mimeType))
                    ids.append(cursor.fetchone()[0])
                    
                return {"ids": ids}


@app.get("/poster_image")
def get_poster_image():
    image_id = request.args.get("image_id")
    last_modified = int(request.args.get("last_modified"))
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_POSTER_IMAGE, [image_id])
            result = cursor.fetchone()
            if result is None:
                return abort(404)
            imageBinary = result[0]
            mimeTime = str(result[1])
            return send_file(
                io.BytesIO(imageBinary),
                as_attachment=False,
                download_name="poster_" + image_id + "." + mimeTime.split("/")[1],
                mimetype=mimeTime,
                last_modified=last_modified,
            )


def checkSession(uuid):
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CHECK_AUTH, [uuid])
            result = cursor.fetchone()
            if result is None:
                return None
            else:
                return result[1]