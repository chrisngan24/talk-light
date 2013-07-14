import time
import random
import math

def generate_fake():
	data = []
	for i in range (0, 11): #eleven times  0 - 10
		data.append({"time": time.time(),"light": random.random() * (5 - 1) + 1})
	return data