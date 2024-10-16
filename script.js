console.log("Script loaded"); // Debug log to confirm script loading

// Import the Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4o__-8ZeK0BGUlgBbIj7ASiZltGW4Da4",
    authDomain: "arduinoweb-5d8cf.firebaseapp.com",
    databaseURL: "https://arduinoweb-5d8cf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "arduinoweb-5d8cf",
    storageBucket: "arduinoweb-5d8cf.appspot.com",
    messagingSenderId: "671232314382",
    appId: "1:671232314382:web:1d4c162cd2ed513500805f",
    measurementId: "G-RFLQX41QFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Get a reference to the database
console.log("Firebase initialized successfully");

// Set up event listeners for radio buttons
setupEventListeners(database); 

// Function to update LED state in Firebase
function updateLedState(database, command) {
    console.log("Sending command to Firebase:", command); // Debugging log

    const ledRef = ref(database, 'ledCommand'); // Reference to the 'ledCommand' node
    set(ledRef, command)
        .then(() => {
            console.log("Command successfully sent:", command); // Debugging log
        })
        .catch((error) => {
            console.error("Error updating Firebase:", error); // Debugging log
        });
}

// Function to set up event listeners for radio buttons
function setupEventListeners(database) {
    
    const radios = [
        { id: 'color1', value: 'red' },
        { id: 'color2', value: 'yellow' },
        { id: 'color3', value: 'green' }
    ];

    radios.forEach(radio => {
        document.getElementById(radio.id).addEventListener('change', function() {
            updateLedState(database, radio.value); // Update state when a radio button is selected
        });
    });
}

