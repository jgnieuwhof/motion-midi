
const unsigned long BAUD_RATE = 9600;

const unsigned long LOOP = 60;
const unsigned long TRIGGER = 1;

struct sensor {
  byte active;
  byte trig;
  byte echo;
  int offset;
  unsigned long lastRead;
};
typedef struct sensor Sensor;

const byte N = 4;
Sensor sensors[] = {
 {.active = 0, .trig = 8, .echo = 9, .offset = NULL, .lastRead = NULL},
 {.active = 0, .trig = 6, .echo = 7, .offset = NULL, .lastRead = NULL},
 {.active = 0, .trig = 2, .echo = 3, .offset = NULL, .lastRead = NULL},
 {.active = 0, .trig = 4, .echo = 5, .offset = NULL, .lastRead = NULL},
};

void setup() {
  Serial.begin(BAUD_RATE);
  delay(1000);

  const long currentTime = millis();
  for(byte i = 0; i < N; i++) {
    const int offset = i * (LOOP / N);
    pinMode(sensors[i].trig, OUTPUT);
    pinMode(sensors[i].echo, INPUT);
    digitalWrite(sensors[i].trig, LOW);
    sensors[i].active = 0;
    sensors[i].offset = offset;
    sensors[i].lastRead = currentTime + offset;
  }
}

byte byteFromLong(unsigned long theLong, byte shift) {
  return (byte)(theLong >> shift);
}

void sendDuration(byte i, unsigned long duration) {
  byte buffer[] = { 0, 0, 0, 0, 0 };
  buffer[0] = i;
  for(byte j = 0; j <= 3; j++) {
    buffer[j + 1] = byteFromLong(duration, j * 8);
  }
  Serial.write(buffer, 5);
}

void loop() {
  const long currentTime = millis();
  for(byte i = 0; i < N; i++) {
    if (sensors[i].active == 0 && currentTime - sensors[i].lastRead >= LOOP + sensors[i].offset) {
      sensors[i].active = 1;
      digitalWrite(sensors[i].trig, HIGH);
    }
    if (sensors[i].active == 1 && currentTime - sensors[i].lastRead >= LOOP + sensors[i].offset + TRIGGER) {
      sensors[i].active = 0;
      sensors[i].lastRead = currentTime;
      digitalWrite(sensors[i].trig, LOW);
      sendDuration(i, pulseIn(sensors[i].echo, HIGH));
    }
  }
}
