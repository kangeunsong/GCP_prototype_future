window.onload = function() {
    setTimeout(spin, 2000);
};

function spin() {
    const roulette = document.getElementById('roulette');
    const randomDegree = Math.floor(Math.random() * 360) + 720;
    roulette.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const selectedTopic = getSelectedTopic();
        if (selectedTopic) { // selectedTopic이 유효할 때만 showPopup 호출
            showPopup(selectedTopic);
        }
    }, 4000); // 회전 종료 후 팝업 표시
}

function getSelectedTopic() {
    const topics = document.querySelectorAll('.roulette-text');
    const pointer = document.querySelector('.pointer');

    // 핀의 중앙 위치를 가져옴
    const pointerRect = pointer.getBoundingClientRect();
    const pointerX = pointerRect.left + pointerRect.width / 2;
    const pointerY = pointerRect.top + pointerRect.height;

    let closestTopic = null;
    let minDistance = Infinity;

    // 각 텍스트 요소의 화면 상 위치를 계산
    topics.forEach(topic => {
        const topicRect = topic.getBoundingClientRect();
        const topicX = topicRect.left + topicRect.width / 2;
        const topicY = topicRect.top + topicRect.height / 2;

        // 핀과 텍스트 요소 간 거리 계산
        const distance = Math.sqrt(
            Math.pow(pointerX - topicX, 2) + Math.pow(pointerY - topicY, 2)
        );

        // 가장 가까운 텍스트를 선택
        if (distance < minDistance) {
            minDistance = distance;
            closestTopic = topic.id;
        }
    });

    return closestTopic;
}

function showPopup(topic) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <div class="popup-content">
            <p id="base">Let's talk about your</p>
            <p id="target">${topic}!</p>
        </div>
    `;

    // 화면 어디든 클릭하면 gamification.html로 이동
    popup.addEventListener("click", () => {
        window.location.href = 'gamification.html';
    });

    document.body.appendChild(popup);
    popup.style.display = 'flex';
}


function closePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}
