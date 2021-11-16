from keras.models import model_from_json
from keras.models import load_model
import numpy as np
import json
import tensorflow as tf
from PIL import Image

import matplotlib.pyplot as plt

def get_img_arr():
    # data = json.loads(sys.argv[1])
    # data = json.loads(input())
    filename = "/Users/shantanugoyal/Desktop/Decarbonate-2/app/glass166.jpg"
    image=Image.open(filename)
    width, height = image.size
    image = np.array(image)
    im = tf.image.resize_with_crop_or_pad(image, 300, 300)
    im = np.array(im)
    return im


def main():
    x = get_img_arr()
    x = np.reshape(x, (1, 300, 300, 3))
    json_file=open('app/model.json', 'r') 
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("app/model.h5")
    print("Loaded model from disk")
    preds = loaded_model.predict(x)
    print(type(preds))


if __name__ == '__main__':
	try :
		main()
	except Exception as e :
		print('error', str(e))