import urllib
import urllib2
import serial

ser = serial.Serial('COM4', 9600)


while True:
	url = 'http://localhost:5000/api/light'
	sensor = ser.readline()
	print sensor
	# data = {'data':sensor}
	# data = {'data':4}
	# data = urllib.urlencode(data)
	req = urllib2.urlopen(url, sensor)
	
