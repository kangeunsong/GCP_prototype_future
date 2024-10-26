let waterLevel = 20; 
let fishPosition = 10; 
const maxWaterLevel = 90;
const waterIncrement = 10;
const fishRiseSpeed = 30;

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const selectedTopic = params.get("topic") || "future";
    const titleElement = document.getElementById("title");
    titleElement.textContent = `Let's talk about your ${selectedTopic}!`;
};

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