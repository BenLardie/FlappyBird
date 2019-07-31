const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const flappyBird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

flappyBird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

const gap = 85;
let constant;

const bX = 10;
let bY = 150;

const gravity = 1;


const audioName = new Audio();

const pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};


const moveUp = () => {
    bY-= 20;
};

document.addEventListener('keydown', moveUp)

const draw = () => {
    ctx.drawImage(bg, 0, 0);
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, 100, 0);
    ctx.drawImage(pipeSouth, 100, 0 + constant);

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(flappyBird, bX, bY);

    bY += gravity;

    requestAnimationFrame(draw);
}

draw();
























