let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkHeartPoint(x, y) {
    return (x ** 2 + y ** 2 - 1) ** 3 - x ** 2 * y ** 3 <= 0;
}

let heartColor = '#ff0000';
let backColor = '#080808';

let c = 0;
let itersCount = 15;
let delay = 1000;

let lastPoint = null;

let intervalId = setInterval(() => {
    if (lastPoint) {
        ctx.beginPath();
        ctx.arc(lastPoint[0], lastPoint[1], lastPoint[2] + 1, 0, Math.PI * 2);
        ctx.fillStyle = backColor;
        ctx.fill();
        ctx.closePath();
    }

    if (c >= itersCount) {
        clearInterval(intervalId);

        c = 0;
        itersCount = 10000;
        delay = 1;
        intervalId = setInterval(() => {
            if (c >= itersCount) {
                clearInterval(intervalId);
                console.log('done');
            }
            else c++;
        
            console.log(c, itersCount);
        
            ctx.beginPath();
        
            let x = getRandomInt(0, window.innerWidth);
            let y = getRandomInt(0, window.innerHeight);
            let r = getRandomInt(3, 5);
        
            let scale = 1 / 200;
            let deltaY = -50;
        
            ctx.arc(x, y, r, 0, Math.PI * 2);
            if (checkHeartPoint(scale * (x - window.innerWidth / 2), -scale * (y - window.innerHeight / 2 + deltaY))) ctx.fillStyle = heartColor;
            else ctx.fillStyle = backColor;
            ctx.fill();  
            ctx.closePath();
        }, delay);

    }
    else c++;

    console.log(c, itersCount);

    ctx.beginPath();

    let x = getRandomInt(0, window.innerWidth);
    let y = getRandomInt(0, window.innerHeight);
    let r = getRandomInt(3, 5);

    let scale = 1 / 200;
    let deltaY = -50;

    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (checkHeartPoint(scale * (x - window.innerWidth / 2), -scale * (y - window.innerHeight / 2 + deltaY))) {
        ctx.fillStyle = '#000';
        lastPoint = null;
    }
    else {
        ctx.fillStyle = '#fff';
        lastPoint = [x, y, r];
    }
    ctx.fill();  
    ctx.closePath();
}, delay);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})