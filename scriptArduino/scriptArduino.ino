#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define SERVICE_UUID        "62dd7650-de59-49b7-9493-11a60f225fe0"
#define CHARACTERISTIC_UUID "c426b21b-85db-4434-9baf-f7c5369ca0cf"

int buzzer = 27; //pin do buzzer
byte sensorPin = 19; //pin do sensor de presenca
int ledVermelho = 15 ; //pin do led vermelho quando alarme disparar
int ledVerde = 12 ; //pin do led verde indicando que alarme está armado ou desarmado
char cmdBluetooth = '0'; //inicia desarmado
bool deviceConnected = false; //saber se algum dispositivo está conectado

//frequencia do buzzer
int freq = 1500;
int channel = 0;
int resolution = 8;

//callback para eventos de escrita e leitura do cliente (react-native)
class CharacteristicCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *characteristic) {
    //retorna ponteiro para o registrador contendo o valor atual da caracteristica
    std::string rxValue = characteristic->getValue(); 
    //verifica se recebeu dados
    if (rxValue.length() > 0) {
      if (rxValue.find('1') != -1) {
        cmdBluetooth = '1';
      }
      else if (rxValue.find('0') != -1) {
        cmdBluetooth = '0';
      }
    }
  }

  void onRead(BLECharacteristic *characteristic) {
    if(cmdBluetooth == '1')
      characteristic->setValue("1");
    else
      characteristic->setValue("0");
  }
};

//callback para receber os eventos de conexão de dispositivos
class ServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
  };
  
  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
  }
};

void setup()
{
  pinMode(sensorPin, INPUT);
  pinMode(ledVermelho, OUTPUT);
  pinMode(ledVerde, OUTPUT);

  //buzzer
  ledcSetup(channel, freq, resolution);
  ledcAttachPin(buzzer, channel);

  Serial.begin(9600);

  //configuracoes pro ble
  BLEDevice::init("Meu Alarme"); //definindo o nome do bluetooth
  BLEServer *server = BLEDevice::createServer(); //cria o objeto server
  server->setCallbacks(new ServerCallbacks()); //callback para conexão de dispositivo cliente
  BLEService *service = server->createService(SERVICE_UUID);
  BLECharacteristic *characteristic = service->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       ); //leitura e escrita (ponto de vista do cliente (app react-native))
  characteristic->setCallbacks(new CharacteristicCallbacks()); //callback para eventos de leitura e escrita do app react-native

  service->start(); //iniciar servico
  BLEAdvertising *advertising = BLEDevice::getAdvertising();
  advertising->addServiceUUID(SERVICE_UUID);
  advertising->setScanResponse(true);
  advertising->setMinPreferred(0x06);  // iPhone connections issue
  advertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising(); //outros dispositivos começam enxergar o arduino ble
}

void loop()
{
  byte state = digitalRead(sensorPin);

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
  ledcWriteTone(channel, freq);
  delay(500); //tempo que o led fica acesso e o buzzer toca
  desligarAlarme();
}

void desligarAlarme() {
  digitalWrite(ledVermelho, LOW);
  //Desligando o buzzer
  ledcWriteTone(channel, 0);
}


/*
//utilizando HC-06
#include <SoftwareSerial.h>
SoftwareSerial BT(9, 10); // RX, TX

int buzzer = 3; //set digital IO pin of the buzzer
byte sensorPin = 5; //sensor de presenca
int ledVermelho = 11 ; //led vermelho quando alarme disparar
int ledVerde = 6 ; //led verde indicando que alarme está armado ou desarmado
char cmdBluetooth = '0'; //inicia desarmado
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
} */
