let waterLevel = 40; 
let fishPosition = 0; 
const maxWaterLevel = 90;
const waterIncrement = 25;
const fishRiseSpeed = 25;

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const selectedTopic = params.get("topic") || "future";
    const titleElement = document.getElementById("title");
    titleElement.textContent = `Let's talk about your ${selectedTopic}!`;
};

function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support Speech Recognition.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US'; // 사용할 언어 설정
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        console.log("Voice recognition started.");
    };

    recognition.onresult = (event) => {
        const memoInput = document.getElementById("memo-input");
        const transcript = event.results[0][0].transcript;
        memoInput.value = transcript;
        console.log("Voice input received:", transcript);
        submitMemo(); // 텍스트가 감지되면 자동으로 메모 추가
    };

    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
    };

    recognition.onend = () => {
        console.log("Voice recognition ended.");
    };

    recognition.start();
}

function submitMemo() {
    const memoInput = document.getElementById("memo-input");

    if (memoInput.value.trim() !== "") {
        waterLevel += waterIncrement;
        fishPosition += fishRiseSpeed;

        const water = document.getElementById("water-level");
        const fish = document.getElementById("fish");
        water.style.height = `${waterLevel}%`;
        fish.style.bottom = `${fishPosition}px`;

        memoInput.value = "";
        memoInput.classList.add("crumple");
        setTimeout(() => memoInput.classList.remove("crumple"), 500);

        if (waterLevel >= maxWaterLevel) {
            showPopup();
        }
    }
}

function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";

    popup.addEventListener("click", () => {
        popup.style.display = "none";
        resetGame();
    });
}

function resetGame() {
    waterLevel = 20;
    fishPosition = 20;
    document.getElementById("water-level").style.height = `${waterLevel}%`;
    document.getElementById("fish").style.bottom = `${fishPosition}px`;
}