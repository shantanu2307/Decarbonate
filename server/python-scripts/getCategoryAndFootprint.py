import tensorflow as tf
import numpy as np
import sys
import json


def rgba2rgb( rgba, background=(255,255,255) ):
	row, col, ch = rgba.shape

	rgb = np.zeros( (row, col, 3), dtype='float32' )
	r, g, b, a = rgba[:,:,0], rgba[:,:,1], rgba[:,:,2], rgba[:,:,3]

	a = np.asarray( a, dtype='float32' ) / 255.0

	R, G, B = background

	rgb[:,:,0] = r * a + (1.0 - a) * R
	rgb[:,:,1] = g * a + (1.0 - a) * G
	rgb[:,:,2] = b * a + (1.0 - a) * B

	return np.asarray( rgb, dtype='float32' )


def get_img_arr():
	# data = json.loads(sys.argv[1])
	data = json.loads(input())
	imgarray = list(map(int, data['img']))
	height = int(data['height'])
	width = int(data['width'])

	im = np.array(imgarray)
	im = np.reshape(im, (height, width, 4))
	im = rgba2rgb(im)/255.0
	im = tf.image.resize_with_crop_or_pad(im,256,256)
	im = np.array(im)

	return im


def main():

	cat_dict = {
		"Cigarette" : 1.39,
		"Clear plastic bottle" : 250.80,
		"Other plastic wrapper" : 60.00,
		"Drink can" : 170.20,
		"Plastic straw" : 1.46,
		"Disposable plastic cup" : 108.86,
		"Glass bottle" : 323.00,
		"Normal paper" : 4.82,
		"Paper cup" : 8.10 ,
		"Corrugated carton" : 28.40,
		"Single-use carrier bag" : 33.20,
		"Drink carton" : 85.00,
		"Tissues" : 5.59,
		"Plastic utensils" : 90.00,
		"Food can" : 110.42,
		"Paper bag" : 52.00
	}

	keyList = list(cat_dict.keys())

	x = get_img_arr()
	x = np.reshape(x, (1,256,256,3))

	# model = tf.keras.models.load_model('./../tfModels/trainedModel_v1.h5')
	model = tf.keras.models.load_model('./server/tfModels/trainedModel_v1.h5')

	y = model.predict(x)
	y = np.argmax(y)

	out = str(keyList[y]) + "," + str(cat_dict[keyList[y]])

	print(out)

if __name__ == '__main__':
	try :
		main()
	except Exception as e :
		print('error', str(e))