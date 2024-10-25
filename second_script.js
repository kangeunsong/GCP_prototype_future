window.onload = function() {
    setTimeout(spin, 2000);
};

function spin() {
    const roulette = document.getElementById('roulette');
    const randomDegree = Math.floor(Math.random() * 360) + 720;
    roulette.style.transform = `rotate(${randomDegree}deg)`;
}