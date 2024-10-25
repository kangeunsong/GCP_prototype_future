document.addEventListener("DOMContentLoaded", function() {
    const icons = document.querySelectorAll(".icon"); // icon 요소 선택
    const dropZones = document.querySelectorAll(".drop .drop-zone");
    const popup = document.getElementById("popup");
    let video = document.createElement("video"); // 팝업용 비디오 태그 생성

    video.controls = true; // 비디오 컨트롤 추가
    video.loop = true; // 반복 재생 설정
    popup.appendChild(video); // 팝업에 비디오 추가

    // 드래그 시작 이벤트
    icons.forEach(icon => {
        const iconId = icon.dataset.icon; // data-icon 값을 미리 가져옴
        
        icon.addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("iconId", iconId); // 아이콘 ID 저장
        });

        icon.addEventListener("click", () => {
            // 아이콘 클릭 시 그림자 추가 및 팝업 표시
            icons.forEach(i => i.classList.remove("icon-shadow")); // 다른 아이콘의 그림자 제거
            icon.classList.add("icon-shadow"); // 현재 클릭한 아이콘에 그림자 추가
            showPopup(iconId); // 아이콘 ID로 showPopup 호출
        });
    });

    // 드롭 영역에 대한 이벤트 설정
    dropZones.forEach(dropZone => {
        dropZone.addEventListener("dragover", function(e) {
            e.preventDefault(); // 드래그 허용
        });

        dropZone.addEventListener("drop", function(e) {
            e.preventDefault();
            const iconId = e.dataTransfer.getData("iconId"); // 저장된 아이콘 ID 가져오기
            const imgSrc = document.querySelector(`[data-icon="${iconId}"] img`).src; // 아이콘 이미지 src 가져오기

            // 이전 아이콘이 존재하면 삭제
            if (dropZone.querySelector("img")) {
                dropZone.querySelector("img").remove();
            }

            // 드롭된 이미지를 추가
            const newIcon = document.createElement("img");
            newIcon.src = imgSrc; // src 설정
            newIcon.style.width = "80px";
            newIcon.style.padding = "5px";
            newIcon.style.margin = "10px";

            // 클릭 시 아이콘 삭제
            newIcon.addEventListener("click", function() {
                newIcon.remove();
            });

            dropZone.appendChild(newIcon); // 드롭존에 아이콘 추가
        });
    });

    // 팝업 열기 함수
    function showPopup(iconId) {
        if (!iconId) return; // 아이콘 ID가 유효하지 않은 경우 함수 종료
        video.src = `./videos/${iconId}.mp4`; 
        popup.style.display = "block";
        video.load(); // 비디오 로드
        video.play().catch(error => {
            console.log("Autoplay prevented. Please click play button:", error);
        }); 
    }

    // 팝업 닫기 함수
    function closePopup() {
        popup.style.display = "none";
        video.pause(); // 팝업 닫힐 때 영상 일시정지
        video.currentTime = 0; // 영상 재시작을 위해 초기화
        
        // 모든 아이콘에서 그림자 제거
        icons.forEach(icon => icon.classList.remove("icon-shadow"));
    }

    // 팝업 외부 클릭 시 닫기
    document.addEventListener("click", event => {
        if (!popup.contains(event.target) && event.target.tagName !== "IMG") {
            closePopup();
        }
    });
});