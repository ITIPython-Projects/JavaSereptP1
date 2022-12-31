
//--------------------------Ahmed Abdelrhman
// Canvase variables 
const canvas = document.querySelector("#gameBord");
const ctx = canvas.getContext("2d");
// Game Variables ==================
const FPS = 60;
const PLAYER_HEIGHT = canvas.height / 3;
const PLAYER_WIDTH = canvas.width / 30;
const RADIUS = canvas.width / 60;  //Used To Check The Hits( Collisions ( overlap ))
const BALL_SIZE = 70
const BALL_START_SPEED = 0.8;
const BALL_DELTA_SPEED = 0.1;
const FONT_STYLE = `${canvas.width / 30}px fantasy`
let COM_LEVEL = 0.01;
let paused = false;
var background = document.getElementById('background')
var ballImage = document.getElementById('ball')
var plyerImage = document.getElementById('plyerImage')
var computerImage = document.getElementById('computerImage')
var borderHit = document.getElementById("borderHit");
var playerHit = document.getElementById("playerHit");
var computerHit = document.getElementById("computerHit");
var plyerLoss = document.getElementById("plyerLoss");
var computerLoss = document.getElementById("computerLoss");
var countDown = document.getElementById("counterDown");

const PLAYER_RESET = {
    x: 0,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2, //To Start Drowing Befor the Center of canvas.height
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#3AB0FF",
    score: 0,
};
const COMPUTER_RESET = {
    x: canvas.width - PLAYER_WIDTH,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#FF1E00",
    score: 0,
};
const BALL_RESET = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: RADIUS,
    speed: BALL_START_SPEED,
    velocityX: 5,               // direction && MoveMent Value ('-' Substraction, '+' Addation)
    velocityY: 5,               // direction && MoveMent Value ('-' Substraction, '+' Addation)
    color: "#3AB0FF",
};
let player = {
    x: 0,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2, //To Start Drowing Befor the Center of canvas.height
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#3AB0FF",
    score: 0,
};
let computer = {
    x: canvas.width - PLAYER_WIDTH,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#FF1E00",
    score: 0,
};
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: RADIUS,
    speed: BALL_START_SPEED,
    velocityX: 5,               // direction && MoveMent Value ('-' Substraction, '+' Addation)
    velocityY: 5,               // direction && MoveMent Value ('-' Substraction, '+' Addation)
    color: "#3AB0FF",
};
//------------------------------------- Draw Functions -----------------------------------
// Draw Shapes ==============
function drawbackGround(x, y, w, h, color) {
    ctx.drawImage(background, x, y, w, h);
}
function drawPlayer(x, y, w, h, color) {
    ctx.drawImage(plyerImage, x, y, w, h);
}
function drawComputer(x, y, w, h, color) {
    ctx.drawImage(computerImage, x, y, w, h);
}
function drawCircle(x, y, r, color) {
    ctx.drawImage(ballImage, x, y, BALL_SIZE, BALL_SIZE);
}
// Draw Text  ==============
function drawText(text, x, y, color = "#59CE8F", fontStyle = FONT_STYLE) {
    ctx.fillStyle = color;
    ctx.font = fontStyle;
    ctx.fillText(text, x, y);
}
//------------------------------------- Frame Function -----------------------------------
function render() {
    // Clear the Canvas With The Back Ground
    drawbackGround(0, 0, canvas.width, canvas.height, "#E8F9FD");

    // Draw Score
    drawText(player.score, canvas.width / 4.5, canvas.height / 5, "#59CE8F");
    drawText(
        computer.score, //show
        (3 * canvas.width) / 4,
        canvas.height / 5,
        "#59CE8F"
    );
    // Draw the player & computer
    drawPlayer(player.x, player.y, player.width, player.height, player.color);
    drawComputer(
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
        b.right > p.left-40 && b.bottom > p.top && b.left < p.right && b.top < p.bottom
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
    if (ball.y + ball.radius > canvas.height-50 || ball.y - ball.radius < 0) {
        borderHitSound()
        ball.velocityY = -ball.velocityY;
    }

    // ball collision with players
    let selectedPlayer = (ball.x < canvas.width / 2) ? player : computer;
    if (collision(ball, selectedPlayer)) {
        switch (selectedPlayer) {
            case player:
                playerHitSound()
                break;
            case computer:
                computerHitSound()
                break;
        }
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
        playerLossSound()
        // increase computer score
        computer.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        computerLossSound()
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
//------------------------------------- pingPongStarter || Start Set -----------------------------------
let interval;
function gameReset() {
    player = structuredClone(PLAYER_RESET);
    computer = structuredClone(COMPUTER_RESET);
    ball = structuredClone(BALL_RESET);
}
function pingPongStarter(selectedlevel) {
    try {
        clearInterval(interval)
    } catch (error) { }
    // Image Sorce Changer
    background.src    = `../media/images/ping_pong/${selectedlevel}/background.jpg`
    ballImage.src     = `../media/images/ping_pong/${selectedlevel}/ball.png`
    plyerImage.src    = `../media/images/ping_pong/${selectedlevel}/player.png`
    computerImage.src = `../media/images/ping_pong/${selectedlevel}/computer.png`
    // Sound Sorce Changer
    countDown.src     = `../media/sound/pingPong/${selectedlevel}/counterDown.mp3`
    borderHit.src     = `../media/sound/pingPong/${selectedlevel}/borderHit.mp3`
    playerHit.src     = `../media/sound/pingPong/${selectedlevel}/plyerHit.mp3`
    computerHit.src   = `../media/sound/pingPong/${selectedlevel}/computerHit.mp3`
    plyerLoss.src     = `../media/sound/pingPong/${selectedlevel}/plyerLoss.mp3`
    computerLoss.src  = `../media/sound/pingPong/${selectedlevel}/computerLoss.mp3`
    // GameReset
    gameReset()
    // Start counterDown Timer
    var i = 0;
    counterDownSound()
    interval = setInterval(() => {
        i++;
        render()
        drawText(i, (canvas.width / 2) - 2, (canvas.height / 2) - 2, "#59CE8F", '150px fantasy');
        console.log(i);
    }, 1000);
    setTimeout(() => {
        try {
            clearInterval(interval)
        } catch (error) { }
        var levelNumber = parseInt(selectedlevel.slice(-1));
        COM_LEVEL = (levelNumber / 5)
        // Set Frams
        interval = setInterval(game, 1000 / FPS);
    }, 3500);
}
//------------------------------------- Audio || Start Set -----------------------------------
function borderHitSound() {
    borderHit.play();
}
function playerHitSound() {
    playerHit.play();
}
function computerHitSound() {
    computerHit.play();
}
function playerLossSound() {
    plyerLoss.play();
}
function computerLossSound() {
    computerLoss.play();
}
function counterDownSound() {
    countDown.play();
}
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
//------------------------------------- Levels Set -----------------------------------
const levels = document.querySelectorAll("#levels ul li");
for (const iterator of levels) {
    iterator.addEventListener("click", (event) => {
        document.getElementsByClassName('activeLevel')[0].classList.remove('activeLevel')
        event.target.classList.add("activeLevel")
        pingPongStarter(event.target.id)
    });
}
