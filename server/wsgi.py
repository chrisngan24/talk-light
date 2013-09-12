from flask import Flask, render_template, request, make_response
import db, util
import json
import uuid, time
from bson import json_util

app = Flask(__name__)


@app.route('/')
def load_index():
	return render_template('index.html')

@app.route('/api/hello')
def api_hello():
	return 'Hello'

@app.route('/api/light', methods=['GET'])
def get_light():	
	cur = db.get_lightCollection().find()
	data = []
	for item in cur:
		print item
		data.append(item)
	return make_response(json.dumps(data, default=json_util.default))
	

@app.route('/api/post', methods=['POST'])
def post_light():
	data = request.data	
	print data
	items = data.split("&")
	dataDict = {
		"_id" :uuid.uuid4(),
		"time": time.time()
	}
	for sensor in items:
		key = sensor.split("=")[0]
		value = float(sensor.split("=")[1])
		dataDict[key] = value
	
	print dataDict
	
	coll = db.get_lightCollection()
	coll.insert(dataDict)
	return 'ok'

def start_script():
	lightColl = db.get_lightCollection()
	lightColl.remove()
	# fakeData = util.generate_fake()
	# for i in fakeData:
	# 	print str(i)
	# 	lightColl.insert(i)

if __name__== '__main__':	
	start_script()
	app.run(threaded=True)
