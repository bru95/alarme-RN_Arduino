# Alarme com sensor de presença e controle por app mobile.

## Descrição do funcionamento do projeto
O objetivo deste projeto é criar um alarme de presença que poderá ser armado e desarmado através de um app mobile desenvolvido em React Native. Para armar/desarmar esse alarme será utilizada a comunicação bluetooth low energy.
O alarme de presença será desenvolvido utilizando arduino, onde um sensor PIR fará a detecção da presença, havendo a detecção, um buzzer disparará um som e um LED será ligado.
Não foi utilizado placa UNO e sim uma placa DOIT ESP32 que já conta com BLE integrado.


###### Componentes para reprodução do embarcado:
* Placa DOIT ESP32
* PIR Motion
* Passive Buzzer
* Dois LEDs e resistores

![alt text](https://github.com/bru95/alarme-RN_Arduino/blob/master/src/img/arduino.jpeg)