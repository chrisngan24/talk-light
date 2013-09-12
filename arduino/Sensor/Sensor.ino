
const int readPin = 0;
const float mInputVoltage = 5;

void setup(){
	Serial.begin(9600);
}

void loop(){
	float lsr = 0.0;
	lsr = analogRead(readPin)*mInputVoltage/1023;
	Serial.print("light=");
	Serial.println(lsr);
	// Serial.println(FloatToString(lsr, 2));
	delay(1000);
}

