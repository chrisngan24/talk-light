import time, uuid
import random
import math

def generate_fake():
	data = []
	for i in range (0, 11): #eleven times  0 - 10
		data.append({"_id" : uuid.uuid4(),"time": time.time(),"light": random.random() * (5 - 1) + 1})
		time.sleep(5)	
	return data