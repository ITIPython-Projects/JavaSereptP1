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
}, 3000)

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
// Game Starter 
const PARANOIA = 'paranoia'
const PING_PONG = 'ping_pong'

var gameType = PARANOIA    // Change Game based on type         
var NewGameHandler = document.getElementById("ParaNewGame")
NewGameHandler.addEventListener("click", function () {
    switch (gameType) {
        case PARANOIA:
            paranoiaStarter();
            break;
        case PING_PONG:
            pingPongStarter();
            break;
    }
    NewGameHandler.style.display = "none"
})
