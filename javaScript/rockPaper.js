
//---------------------Ahmed Abdelnasser
var Rock = document.getElementById("Rock")
var Paper = document.getElementById("Paper")
var Scissors = document.getElementById("Scissors")
var RockPaper = document.getElementById("RockPaper")

var playerScore = document.getElementById("score_a")
var computerScore = document.getElementById("score_b")

var player = 0
var computer = 0
var ingame = 0
var choice
var computerChoice

function randomChoice() {
    var randomChoice = Math.floor(Math.random() * 3) + 1
    computerChoice = randomChoice
}

//Funcao chamada quando voce escolher uma opcao

//Function called when you pick a option
function pickOption(o) {
    if (choice == undefined) {
        choice = o

        if (o == 1) {
            Rock.classList = "player"
        } else if (o == 2) {
            Paper.classList = "player"
        } else {
            Scissors.classList = "player"
        }

        if (computerChoice == undefined) {
            randomChoice()
            while (computerChoice == choice) {
                randomChoice()
            }

            if (computerChoice == 1) {
                Rock.classList = "computer"
            } else if (computerChoice == 2) {
                Paper.classList = "computer"
            } else {
                Scissors.classList = "computer"
            }
        }

        getWin(choice, computerChoice)
    } else {
        alert("You've already played!")
    }
    ingame = 0
}

function getWin(p, c) {

    if (ingame == 1) {

        if (p == 1 && c == 2) {
            computer++
        } else if (p == 1 && c == 3) {
            player++
        } else if (p == 2 && c == 1) {
            player++
        } else if (p == 2 && c == 3) {
            computer++
        } else if (p == 3 && c == 1) {
            computer++
        } else if (p == 3 && c == 2) {
            player++
        }

        playerScore.innerHTML = player
        computerScore.innerHTML = computer
    }
}
function newGame() {

    if (ingame == 0) {
        ingame = 1
        choice = undefined
        computerChoice = undefined

        Rock.classList = ""
        Paper.classList = ""
        Scissors.classList = ""

        playerScore.innerHTML = player
        computerScore.innerHTML = computer
    }
}