
// Carrousal
let image = 0;
function increase() {
  image++
  showSlides();
}
function decrease() {
  image--
  showSlides();
}

showSlides();
setInterval(function () {
  image++
  showSlides()
}, 5000)

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("SlideIMG");
  if (image > slides.length) {
    image = 1
  }
  if (image < 1) {
    image = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[image - 1].style.display = "block";
}
// ~ Carrousal

ParaStart = document.getElementById("ParaStart")
PingStart = document.getElementById("PingStart")
RockStart = document.getElementById("RockStart")

ParaStart.addEventListener("click", Para)
function Para() {
  ParaCanvas.style.display = "block"
  PingCanvas.style.display = "none"
  NewParaGameHandler.style.display = "block"
  NewPingGameHandler.style.display = "none"
  NewRockGameHandler.style.display = "none"

}

PingStart.addEventListener("click", Ping)
function Ping() {
  ParaCanvas.style.display = "none"
  PingCanvas.style.display = "block"
  RockPaper.style.display = "none"
  NewParaGameHandler.style.display = "none"
  NewPingGameHandler.style.display = "block"
  NewRockGameHandler.style.display = "none"
}

RockStart.addEventListener("click", Rock)
function Rock() {
  ParaCanvas.style.display = "none"
  PingCanvas.style.display = "none"
  RockPaper.style.display = "block"
  NewParaGameHandler.style.display = "none"
  NewPingGameHandler.style.display = "none"
  NewRockGameHandler.style.display = "block"
}
// Game Changer 
let gameButtons = document.querySelectorAll('.gamesButtons ul li a');
let gameFrame   = document.getElementById('gamesFrame')
for (let index = 0; index < gameButtons.length; index++) {
  const iterator = gameButtons[index];
  iterator.addEventListener("click",function(event){

    document.getElementsByClassName('activeGame')[0].classList.remove('activeGame')
    gameFrame.src = `gamesFrams/${event.target.id}.html`
    event.target.classList.add("activeGame")

  });
}