from flask import Flask, render_template, request
import db, util
import json

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
	return str(data)
	

@app.route('/api/light', methods=['POST'])
def post_light():
	data = request.data	
	data = {
		'data' : data
	}
	collection.append(data)
	coll = db.get_lightCollection()
	coll.insert(data)
	return 'ok'

def start_script():
	lightColl = db.get_lightCollection()
	lightColl.remove()
	fakeData = util.generate_fake()
	for i in fakeData:
		print str(i)
		lightColl.insert(i)

if __name__== '__main__':	
	start_script()
	app.run()
