import pymongo

db_name = 'talkLight'

def get_db():
	
	return client

def get_lightCollection():
	print db_name
	conn = pymongo.Connection('localhost:27017')
	
	return conn[db_name].light