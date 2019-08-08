const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const button = document.querySelector('button');

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

const gravity = 1.7;

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

const fly = new Audio();
const scor = new Audio();

fly.src = 'sounds/fly.mp3';
scor.src = 'sounds/score.mp3';

const pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0,
};

const moveUp = () => {
  bY -= 27.5;
  fly.play();
};

document.addEventListener('keydown', moveUp);

let paused = true;

function togglePause()
{
    if (!paused)
    {
    paused = true;
    console.log(paused)
    } else if (paused)
    {
       paused= false;
       console.log(paused)
    }
}

button.addEventListener('click', () => togglePause());

const draw = () => {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    if (bX + flappyBird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height || bY + flappyBird.height >= pipe[i].y + constant) ||
        bY + flappyBird.height >= cvs.height - fg.height) {
        location.reload()
        }

        if (pipe[i].x === 5) {
      score++;
            scor.play();
        }

        if (score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore)
    }
    }
    constant = pipeNorth.height + gap;

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(flappyBird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score + "High Score: " + highScore, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

const buttonClick = () => alert('click');


draw();