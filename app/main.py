import tensorflow as tf
import json
import numpy as np
from keras.models import load_model
from keras.models import model_from_json
from flask import Flask
from flask import request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


def rgba2rgb(rgba, background=(255, 255, 255)):
    row, col, ch = rgba.shape

    rgb = np.zeros((row, col, 3), dtype='float32')
    r, g, b, a = rgba[:, :, 0], rgba[:, :, 1], rgba[:, :, 2], rgba[:, :, 3]
    a = np.asarray(a, dtype='float32') / 255.0

    return np.asarray(rgb, dtype='float32')


def get_img_arr(image, height, width):
    image = list(map(int, image))
    image = np.array(image)
    image = np.reshape(image, (height, width, 4))
    image = rgba2rgb(image)/255.0
    image = tf.image.resize_with_crop_or_pad(image, 300, 300)
    image = np.array(image)
    return image


def main(image,height, width):
    x = get_img_arr(image,height, width)
    x = np.reshape(x, (1, 300, 300, 3))
    json_file = open('app/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("app/model.h5")
    print("Loaded model from disk")
    preds = loaded_model.predict(x)
    objects = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
    preds = np.squeeze(preds)
    ans = 0
    for i in range(len(preds)):
        preds[i] *= i
        ans += int(preds[i])

    print(objects[ans])
    return objects[ans]


@app.route("/", methods=["GET", "POST"])
def getPrice():
    cat_dict = {
		  "metal" : 170.20,
		  "plastic" : 1.46,
		  "trash" : 108.86,
		  "glass" : 323.00,
		  "paper" : 4.82,
		  "cardboard" : 28.40,
	  }
    query = request.get_json()
    image=query['img']
    ans = main(image,query['height'],query['width'])
    List = []
    List.append(ans)
    List.append(cat_dict[ans])
    return json.dumps(List)
