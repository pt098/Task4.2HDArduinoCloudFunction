console.log("Script loaded"); // Debug log to confirm script loading

// Import the Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

//  Firebase configuration
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
const app = initializeApp(firebaseConfig); // Initialize Firebase
const database = getDatabase(app); // Get a reference to the database
console.log("Firebase initialized successfully");

// Set up event listeners for checkboxes
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

// Function to set up event listeners for checkboxes
function setupEventListeners(database) {
    
    const checkboxes = [
        { id: 'redCheckbox', value: 'red' },
        { id: 'greenCheckbox', value: 'green' },
        { id: 'blueCheckbox', value: 'blue' }
    ];

    checkboxes.forEach(checkbox => {
        document.getElementById(checkbox.id).addEventListener('change', function() {
            updateLedStates(database); // Update states whenever any checkbox is changed
        });
    });
}

// Function to update the LED states based on checkbox selection
function updateLedStates(database) {
    const ledStates = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            ledStates.push(checkbox.value); // Add checked LED value to the array
        }
    });

    // Update the Firebase with the current LED states
    const command = ledStates.join(','); 
    updateLedState(database, command); // Send the command to Firebase
}
