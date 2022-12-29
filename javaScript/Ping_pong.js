// Canvase variables 
const canvas = document.querySelector("#gameBord");
const ctx = canvas.getContext("2d");
// Game Variables ==================
const FPS = 60;
const COM_LEVEL = 0.2;
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 20;
const BALL_START_SPEED = 0.5;
const BALL_DELTA_SPEED = 0.1;
let paused = false;
// Game Objects ======================
const net = {
    x: canvas.width / 2 - 1, // 1 To be  in the  Center (width/2)-1
    y: 0,
    width: 2,
    height: 10,             // height Of  the  Single Net line
    color: "#59CE8F",
};
const player = {
    x: 0,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2, //To Start Drowing Befor the Center of canvas.height
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#3AB0FF",
    score: 0,
};
const computer = {
    x: canvas.width - PLAYER_WIDTH,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#FF1E00",
    score: 0,
};
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: BALL_START_SPEED,
    velocityX: 5,               // direction && MoveMent Value ('-' Substraction, '+' Addation)
    velocityY: 5,               // direction && MoveMent Value ('-' Substraction, '+' Addation)
    color: "#3AB0FF",
};
//------------------------------------- Draw Functions -----------------------------------
// Draw Shapes ==============
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);  // From 0 To 360
    ctx.closePath();
    ctx.fill();
}

// Draw Text  ==============
function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
}
// Draw Net  ==============
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
//------------------------------------- Frame Function -----------------------------------
function render() {
    // Clear the Canvas With The Back Ground
    drawRect(0, 0, canvas.width, canvas.height, "#E8F9FD");

    // Draw the net
    drawNet();

    // Draw Score
    drawText(player.score, canvas.width / 4.5, canvas.height / 5, "#59CE8F");
    drawText(
        computer.score, //show
        (3 * canvas.width) / 4,
        canvas.height / 5,
        "#59CE8F"
    );
    // Draw the player & computer
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(
        computer.x,
        computer.y,
        computer.width,
        computer.height,
        computer.color
    );

    // Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
//------------------------------------- Make The Game Live -----------------------------------
// Check Collisions ( overlap )
function collision(b, p) {
    //Ball Edges
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    //player Edges
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return (
        b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
    );
}
// Set Game Level 
function lerp(currentPos, targetPos, COM_LEVEL) {

    return currentPos + (targetPos - currentPos) * COM_LEVEL; // t=0 (a) , t=1 (b)
}
// Reset Ball Diriction
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = BALL_START_SPEED;
    ball.velocityX = -ball.velocityX;
}
// Move player On mousemove
canvas.addEventListener("mousemove", (e) => {
    if (paused) return;     //Stop the  moving of player While the game Pused 

    let rect = canvas.getBoundingClientRect();

    player.y = e.clientY - rect.top - player.height / 2;
});
// Update Geame Opjects : pos, mov, score, .... ==========
function update() {
    if (paused) return;

    // ball movement
    ball.x += (ball.velocityX * ball.speed);
    ball.y += (ball.velocityY * ball.speed);

    // ball collision with Top & Bottom borders
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        audioHit()
        ball.velocityY = -ball.velocityY;
    }

    // ball collision with players
    let selectedPlayer = (ball.x < canvas.width / 2) ? player : computer;
    if (collision(ball, selectedPlayer)) {
        audioHit()
        ball.velocityX = -ball.velocityX;
        // every time ball hits a player, we increase its speed
        ball.speed += BALL_DELTA_SPEED;
    }

    // Computer Movement 
    let targetPos = ball.y - computer.height / 2;  //( computer.height / 2) To make the Center move with ball
    let currentPos = computer.y;
    computer.y = lerp(currentPos, targetPos, COM_LEVEL);

    // Update Score
    if (ball.x - ball.radius < 0) {
        // increase computer score
        computer.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        // increase player score
        player.score++;
        resetBall();
    }
}

// Game Set =====================
function game() {
    update()
    render();
}
// Set Frams
setInterval(game, 1000 / FPS);

//------------------------------------- Pause || Start Set -----------------------------------
const pauseBtn = document.querySelector("#pause");
pauseBtn.addEventListener("click", () => {
    if (pauseBtn.innerHTML === "Resume") {
        pauseBtn.innerHTML = "Pause";
        paused = false;
    } else {
        pauseBtn.innerHTML = "Resume";
        paused = true;
    }
});

//------------------------------------- Audio || Start Set -----------------------------------
var audio = document.getElementById("hit");
function audioHit() {
    audio.play();
}
