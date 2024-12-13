let scale = Math.max(1 / 200, 1 / window.innerWidth * 4, 1 / window.innerHeight * 4);
console.log(scale);

const deltaY = -50;

let heartColor = '#ff0000';
let backColor = '#101010';


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let sound = new Audio('https://github.com/eledays/heart/raw/refs/heads/main/0.mp3');

let start_btn = document.querySelector('button.start');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    location.reload();
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkHeartPoint(x, y) {
    return (x ** 2 + y ** 2 - 1) ** 3 - x ** 2 * y ** 3 <= 0;
}

function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();  
    ctx.closePath();
}

function drawPoints(ctx, n, delay) {
    console.log(n);
    
    let x = getRandomInt(0, window.innerWidth);
    let y = getRandomInt(0, window.innerHeight);
    let r = getRandomInt(5, 7);
    let color = null;
    
    if (checkHeartPoint(scale * (x - window.innerWidth / 2), -scale * (y - window.innerHeight / 2 + deltaY))) {
        color = heartColor;
    }
    else {
        color = backColor;
        r = getRandomInt(2, 4);
    }

    drawPoint(ctx, x, y, r, color);

    if (n <= 0) {
        return;
    }
    else {
        setTimeout(drawPoints, delay, ctx, n - 1, delay);
    }
}

start_btn.addEventListener('click', () => {
    start_btn.style.opacity = 0;
    setTimeout(() => start_btn.remove(), 500);

    sound.play();

    let n = 10;
    let delay = 1000;
    drawPoints(ctx, n, delay);

    setTimeout(drawPoints, delay * n, ctx, 50000, 1);
});

let sound_on = true;
let sound_btn = document.querySelector('button.volume');
sound_btn.addEventListener('click', () => {
    sound_on = !sound_on;
    sound_btn.querySelector('span').innerText = (sound_on) ? 'volume_up' : 'volume_off';
    sound.volume = sound_on ? 1 : 0;
});