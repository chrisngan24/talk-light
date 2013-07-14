
const int readPin = 0;
const float mInputVoltage = 5;

void setup(){
	Serial.begin(9600);
}

void loop(){
	float lsr = 0.0;
	lsr = analogRead(readPin)*mInputVoltage/1023;
	Serial.print("light=");
	Serial.println(FloatToString(lsr, 2));
	delay(1000);
}

String FloatToString(float pNumber, int pDecimalDigits){
	String aReturnString = "";

	//Gets values before decimal
	aReturnString += int(pNumber);
	//adds decimal
	aReturnString +=".";

	if (pDecimalDigits =2){
		aReturnString += int((pNumber-int(pNumber)) *100);
	}

	return aReturnString;
}