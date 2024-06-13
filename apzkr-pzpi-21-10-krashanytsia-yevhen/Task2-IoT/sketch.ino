#include <BluetoothSerial.h>

BluetoothSerial SerialBT;

// Піни для індикаторів
const int ledPower = 25;
const int ledRock = 33;
const int ledCountry = 32;
const int ledLearning = 23;

// Пін для динаміка
const int speakerPin = 13;

// Пін для регулювання гучності
const int potPin = 34;

bool powerState = false;
int currentMode = 0; // 0 - нормальний, 1 - рок, 2 - кантрі, 3 - навчання
int customModeFrequency = 0; // Частота для користувацького режиму
String customModeName = ""; // Назва користувацького режиму

// Змінні для режиму навчання
bool learningPhase = true;
unsigned long lastToggleTime = 0;
const unsigned long learningInterval = 2000; // Інтервал в мілісекундах для кожної фази

void setup() {
  Serial.begin(115200);
  //SerialBT.begin("GuitarController"); // Ініціалізуємо Bluetooth

  // Ініціалізуємо LEDC
  ledcSetup(0, 5000, 8); // канал 0, частота 5000 Гц, біти роздільної здатності 8
  ledcAttachPin(speakerPin, 0); // Прикріплюємо пін до каналу 0 LEDC

  // Налаштування пінів
  pinMode(ledPower, OUTPUT);
  pinMode(ledRock, OUTPUT);
  pinMode(ledCountry, OUTPUT);
  pinMode(ledLearning, OUTPUT);
  pinMode(speakerPin, OUTPUT);
  pinMode(potPin, INPUT);  // Set the potentiometer pin as an input

  // Вимикаємо всі світлодіоди
  digitalWrite(ledPower, LOW);
  digitalWrite(ledRock, LOW);
  digitalWrite(ledCountry, LOW);
  digitalWrite(ledLearning, LOW);

  Serial.println("System initialized. Enter commands via Serial Monitor.");
}

void loop() {
  // Відображення стану світлодіодів
  digitalWrite(ledPower, powerState ? HIGH : LOW);
  digitalWrite(ledRock, (currentMode == 1) ? HIGH : LOW);
  digitalWrite(ledCountry, (currentMode == 2) ? HIGH : LOW);
  digitalWrite(ledLearning, (currentMode == 3) ? HIGH : LOW);

  // Читання гучності
  int sensorValue = analogRead(potPin);
  int volume = map(sensorValue, 0, 4095, 0, 255); // Оновлено для більш точного діапазону ADC ESP32

  // Імітація аудіо виходу
  if (powerState) {
    if (volume == 0) {
      noTone(speakerPin); // Вимикаємо звук, якщо гучність 0
    } else {
      if (currentMode == 3) { // Режим навчання
        unsigned long currentTime = millis();
        if (currentTime - lastToggleTime >= learningInterval) {
          learningPhase = !learningPhase;
          lastToggleTime = currentTime;
        }
        if (learningPhase) {
          tone(speakerPin, volume+440); // або іншу частоту для режиму навчання
        } else {
          noTone(speakerPin);
        }
      } else if (currentMode == 4) { // Користувацький режим
        tone(speakerPin, volume+customModeFrequency);
      } else { // Інші режими
        switch (currentMode) {
          case 1:
            tone(speakerPin, volume+440); // Режим рок
            break;
          case 2:
            tone(speakerPin, volume+330); // Режим кантрі
            break;
          default:
            tone(speakerPin, volume); // Нормальний режим
            break;
        }
      }
      Serial.print("Mode: ");
      Serial.print(currentMode);
      Serial.print(" - Volume: ");
      Serial.println(volume);
    }
  } else {
    noTone(speakerPin);
  }

  // Читання даних з Bluetooth або серійного монітора
  if (SerialBT.available() || Serial.available()) {
    String command;
    if (SerialBT.available()) {
      command = SerialBT.readStringUntil('\n');
    } else {
      command = Serial.readStringUntil('\n');
    }
    command.trim();
    Serial.println("Received: " + command);

    if (command == "POWER") {
      powerState = !powerState;
    } else if (command == "ROCK" && powerState) {
      currentMode = 1;
    } else if (command == "CONTRY" && powerState) {
      currentMode = 2;
    } else if (command == "LEARNING" && powerState) {
      currentMode = 3;
      learningPhase = true;
      lastToggleTime = millis();
    } else if (command.startsWith("ADD MODE") && powerState) {
      int spaceIndex = command.indexOf(' ', 9);
      if (spaceIndex != -1) {
        customModeFrequency = command.substring(9, spaceIndex).toInt();
        customModeName = command.substring(spaceIndex + 1);
        currentMode = 4; // Встановлюємо користувацький режим
        Serial.print("Custom Mode Added: ");
        Serial.print(customModeName);
        Serial.print(" with frequency ");
        Serial.println(customModeFrequency);
      }
    }
  }

  delay(100);
}
