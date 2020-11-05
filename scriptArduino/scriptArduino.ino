#include <SoftwareSerial.h>
SoftwareSerial BT(9, 10); // RX, TX

int buzzer = 3; //set digital IO pin of the buzzer
byte sensorPin = 5;
int pinLed = 11 ;
int cmdBluetooth = 1;
void setup()
{
  pinMode(buzzer, OUTPUT); // set digital IO pin pattern, OUTPUT to be output
  pinMode(sensorPin, INPUT);
  pinMode(pinLed, OUTPUT);

  Serial.begin(9600);
  BT.begin(9600); // HC-06 usually default baud-rate
}

void loop()
{
  while (BT.available()) {
    Serial.write(BT.read());
  }

  while (Serial.available()) {
    BT.write(Serial.read());
  }

  byte state = digitalRead(sensorPin);
  if (state == 1 && cmdBluetooth == 1)
    ligarAlarme();
  else if (state == 0)
    desligarAlarme();

}

void ligarAlarme() {
  digitalWrite(pinLed, HIGH);
  //Ligando o buzzer com uma frequencia de 1500 hz.
  tone(buzzer, 1500);
  delay(500); //tempo que o led fica acesso e o buzzer toca
  desligarAlarme();
}

void desligarAlarme() {
  digitalWrite(pinLed, LOW);
  //Desligando o buzzer
  noTone(buzzer);
}

/*#include <SoftwareSerial.h>

  SoftwareSerial mySerial (9,10); // RX, TX

  void setup () {
    mySerial.begin(9600);
    Serial.begin(9600);
    Serial.println("Enter AT commands:");
  }

  void loop() {
    while (mySerial.available()) {
        Serial.write(mySerial.read());
    }

    while (Serial.available()) {
        mySerial.write(Serial.read());
    }
  }*/
