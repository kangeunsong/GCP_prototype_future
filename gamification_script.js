let waterLevel = 40; 
let fishPosition = 0; 
const maxWaterLevel = 90;
const waterIncrement = 25;
const fishRiseSpeed = 25;

// This function now only updates the topic title on page load
window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const selectedTopic = params.get("topic") || "future";
    const titleElement = document.getElementById("title");
    titleElement.textContent = `Let's talk about your ${selectedTopic}!`;
};

let recognition; // Declare recognition globally for reuse

function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support Speech Recognition.");
        return;
    }

    // Initialize Speech Recognition only when the button is clicked
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Start voice recognition
    recognition.start();

    // Display voice input in the memo area
    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        const memoInput = document.getElementById("memo-input");

        // Log the recognized text to the console
        console.log("Voice Input Recognized:", voiceInput);
        
        memoInput.value = voiceInput;
        submitMemo(); // Automatically submit the memo after voice input
    };

    // Handle errors in voice recognition
    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => {
        console.log("Voice recognition ended.");
    };
}

// Navigate to other pages
function navigateTo(page) {
    window.location.href = page;
}

// Submit memo and update water/fish position
function submitMemo() {
    const memoInput = document.getElementById("memo-input");

    if (memoInput.value.trim() !== "") {
        waterLevel += waterIncrement;
        fishPosition += fishRiseSpeed;

        const water = document.getElementById("water-level");
        const fish = document.getElementById("fish");
        water.style.height = `${waterLevel}%`;
        fish.style.bottom = `${fishPosition}px`;

        // Clear memo input
        memoInput.value = "";

        // Show popup if the fish escapes
        if (waterLevel >= maxWaterLevel) {
            showPopup();
        }
    }
}

function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";

    // Close popup and reset game on click
    popup.addEventListener("click", () => {
        popup.style.display = "none";
        resetGame();
    });
}

// Reset game for replayability
function resetGame() {
    waterLevel = 20;
    fishPosition = 20;
    document.getElementById("water-level").style.height = `${waterLevel}%`;
    document.getElementById("fish").style.bottom = `${fishPosition}px`;
}