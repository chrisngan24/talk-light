import urllib
import urllib2
import serial



def main():
	ser = serial.Serial('COM4', 9600)

	while True:
		url = 'http://localhost:5000/api/post'
		sensor = ser.readline()
		# sensor = "light=3"
		print sensor
		# sensor = urllib.urlencode(sensor)
		# data = {'data':sensor}
		# data = {'data':4}
		# data = urllib.urlencode(data)
		req = urllib2.urlopen(url, sensor)
if __name__ == '__main__':
	main()
