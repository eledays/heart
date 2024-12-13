const scale = 1 / 200;
const deltaY = -50;

let heartColor = '#ff0000';
let backColor = '#101010';


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

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

let sound = new Audio('0.mp3');
sound.play();

let n = 10;
let delay = 1000;
drawPoints(ctx, n, delay);

setTimeout(drawPoints, delay * n, ctx, 50000, 1);