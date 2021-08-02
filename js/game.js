'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = '🎇';
const CHERRY = '🍒';

var gBoard;
var gCherryInterval;

var gGame = {
    score: 0,
    foodCount: 0,
    isOn: false,
    isWin: false
}

function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    renderMat(gBoard, '.board-container');
    gGame.isOn = true;
    gCherryInterval = setInterval(renderCherry, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (isPowerFood(i, j)) {
                board[i][j] = POWERFOOD;
                continue;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                continue;
            }
            gGame.foodCount++;
        }
    }
    return board;
}


function updatePower() {
    gPacman.isSuper = true;
    updateGhosts();
    setTimeout(() => {
        resetGhostsColors();
        gPacman.isSuper = false;
        renderCell(gPacman.location, getPacmanHTML());
    }, 5000);
}
function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if(gGame.score === 0 && gGame.foodCount === 0) return;
    if (gGame.score >= gGame.foodCount) { winGame() };
}
function winGame() {
    clearGame();
    gGame.isWin = true;
    openModal(gGame.isWin);
}
function loseGame() {
    clearGame();
    openModal(gGame.isWin);
}
function resetGame() {
    closeModal();
    clearGame();
    updateScore(0);
    init();
}

// MODAL
function openModal(isWin) {
    var elModal = document.querySelector('.modal');
    elModal.style.display = "block";
    var elModalHeader = document.querySelector('.modal h2');
    // (isWin) ? elModalHeader.innerText = 'You won!' : elModalHeader.innerText = 'Game Over!'; // LO TOV
    elModalHeader.innerText = isWin ? 'you won' : 'game over'; // AHLA GEVER

}
function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = "none";
}
// powerfood pos check
function isPowerFood(i, j) {
    if (i === 1 && j === 1) return true;
    if (i === 1 && j === 8) return true;
    if (i === 8 && j === 1) return true;
    if (i === 8 && j === 8) return true;
    return false;
}
// get ghost from gGhosts
function getGhost(location){
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if(currGhost.location.i === location.i && currGhost.location.j === location.j) return currGhost;
    }
    return null;
}

function renderCherry(){
    var cherryCell = getEmptyCell();
    gBoard[cherryCell.i][cherryCell.j] = CHERRY;
    renderCell(cherryCell, CHERRY);
}

function clearGame(){
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gGame.isOn = false;
    gGame.isWin = false;
    gGame.score = 0;
    gGame.foodCount = 0
}