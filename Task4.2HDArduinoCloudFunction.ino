#include <WiFiNINA.h>
#include <Firebase_Arduino_WiFiNINA.h>

// Your network credentials
#define WIFI_SSID "PT" // Your WiFi SSID
#define WIFI_PASSWORD "p@12345678" // Your WiFi Password

// Firebase credentials
#define FIREBASE_HOST "arduinoweb-5d8cf-default-rtdb.asia-southeast1.firebasedatabase.app" // Firebase Database URL
#define FIREBASE_AUTH "APohaN8qH0dc9VQMnZVZWeqJ2ofFeMeNP0aFXdfA" // Firebase Database Secret

// LED pins
const int redLedPin = 2;
const int greenLedPin = 3;
const int blueLedPin = 4;

// Firebase data object
FirebaseData firebaseData;

void setup() {
    // Initialize serial communication
    Serial.begin(9600);
    
    // Initialize LED pins
    pinMode(redLedPin, OUTPUT);
    pinMode(greenLedPin, OUTPUT);
    pinMode(blueLedPin, OUTPUT);
    
    // Connect to Wi-Fi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("Connected to WiFi");

    // Connect to Firebase
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, WIFI_SSID, WIFI_PASSWORD); // Include all four arguments
    Serial.println("Connected to Firebase");
}

void loop() {
    // Check if the Firebase string "ledCommand" is available
    if (Firebase.getString(firebaseData, "ledCommand")) {
        String command = firebaseData.stringData(); // Get the string value
        Serial.println("Received command: " + command);
        
        // Reset all LEDs to OFF
        digitalWrite(redLedPin, LOW);
        digitalWrite(greenLedPin, LOW);
        digitalWrite(blueLedPin, LOW);

        // Set LEDs based on the command
        if (command.indexOf("red") >= 0) {
            digitalWrite(redLedPin, HIGH); // Turn on red LED
        }
        if (command.indexOf("green") >= 0) {
            digitalWrite(greenLedPin, HIGH); // Turn on green LED
        }
        if (command.indexOf("blue") >= 0) {
            digitalWrite(blueLedPin, HIGH); // Turn on blue LED
        }
    } else {
        Serial.println("Failed to get ledCommand from Firebase");
        Serial.println(firebaseData.errorReason());
    }

    delay(1000); // Check every second
}
