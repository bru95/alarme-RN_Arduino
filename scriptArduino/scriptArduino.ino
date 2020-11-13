#include <SoftwareSerial.h>
SoftwareSerial BT(9, 10); // RX, TX

int buzzer = 3; //set digital IO pin of the buzzer
byte sensorPin = 5; //sensor de presenca
int ledVermelho = 11 ; //led vermelho quando alarme disparar
int ledVerde = 6 ; //led verde indicando que alarme está armado ou desarmado
char cmdBluetooth = 0; //inicia desarmado
void setup()
{
  pinMode(buzzer, OUTPUT); // set digital IO pin pattern, OUTPUT to be output
  pinMode(sensorPin, INPUT);
  pinMode(ledVermelho, OUTPUT);
  pinMode(ledVerde, OUTPUT);

  Serial.begin(9600);
  BT.begin(9600); // HC-06 usually default baud-rate
}

void loop()
{
  byte state = digitalRead(sensorPin);

  if (BT.available()){ // verifica se existem bytes a serem lidos da porta serial virtual
     cmdBluetooth = BT.read(); // Lê 1 byte da porta serial
     Serial.print(cmdBluetooth); // Mostra esse dado lido na porta 
  }

  if(cmdBluetooth == '1')
    digitalWrite(ledVerde, HIGH);
  else
    digitalWrite(ledVerde, LOW);

  if(cmdBluetooth == '1' && state == 1)
    ligarAlarme();
  else if (state == 0)
    desligarAlarme();
}

void ligarAlarme() {
  digitalWrite(ledVermelho, HIGH);
  //Ligando o buzzer com uma frequencia de 1500 hz.
  tone(buzzer, 1500);
  delay(500); //tempo que o led fica acesso e o buzzer toca
  desligarAlarme();
}

void desligarAlarme() {
  digitalWrite(ledVermelho, LOW);
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
