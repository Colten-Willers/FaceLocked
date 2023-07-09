"!pip install deepface"

from flask import Flask, render_template, redirect, request, session, flash
from passlib.hash import pbkdf2_sha256
from other_functions import login_required
from flask_cors import CORS
import json
from deepface import DeepFace
from PIL import *
import os

from flask import jsonify

app = Flask(__name__)

app.config['SECRET_KEY'] = 'ultra_secret_key'

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database1.db'


# db = SQLAlchemy(app)


CORS(app)

@app.route("/", methods=["POST"])
def index():
    # image_path_to_test = "./Unbenannt.PNG"
    image = str(request.get_json()["image"])
    save_image(image)
    # image.save("Test_Image.jpg")
    # image_path = "./Test_Image.jpg"
    dict_ = dict()
    verification = verification_check("image_path_to_test", "image_path")
    if find_face("Test_Image.jpg"):
        dict_["verification"] = str(verification["verified"])
    else:
        dict_["verification"] = "False"
    # print(dict_)
    os.remove("Test_Image.jpg")
    return jsonify(dict_) #verification_check("image_path_to_test", "image_path")
    # return redirect("/items")

import base64

def save_image(image_as_string):
    image_data = image_as_string.split(',')[1]  # Remove the "data:image/jpeg;base64," part
    image_decoded = base64.b64decode(image_data)
    filename = './Test_Image.jpg'
    with open(filename, 'wb') as f:
        f.write(image_decoded)


def verification_check(image_path_to_test, image_path):
    verification = DeepFace.verify(img1_path = "Unbenannt.JPG", img2_path = "Test_Image.jpg", enforce_detection=False, model_name="Facenet") #Unbenannt.PNG
    return verification

import cv2

def find_face(image_path):
    # Load the cascade
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    if len(faces) != 0:
        return True