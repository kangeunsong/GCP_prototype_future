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

    // Start voice recognition when the page loads
    startVoiceRecognition();
};

let recognition;

function startVoiceRecognition() {
    const memoInput = document.getElementById("memo-input");

    // 음성 인식 객체 초기화
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false; // 확정된 결과만 받음
    recognition.maxAlternatives = 1;

    recognition.start();

    // 음성 인식 결과를 텍스트로 변환
    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        console.log("Voice Input:", voiceInput);

        // 변환된 텍스트를 메모 입력 창에 출력
        memoInput.value = voiceInput;
        submitMemo(); // 음성 입력 후 메모 제출
    };

    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => {
        console.log("Voice recognition ended.");
    };
}

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

        // 입력 창 초기화
        memoInput.value = "";

        // 물고기 탈출 확인
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