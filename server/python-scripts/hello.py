import sys
import json


data = json.loads(sys.argv[1])
imgarray = list(map(int, data['img']))
height = int(data['height'])
width = int(data['width'])

print()