'use strict'
const GHOST = '&#9781;';

var gGhosts;
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    if (gGame.isOn) {

        var moveDiff = getMoveDiff()
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        var nextCell = gBoard[nextLocation.i][nextLocation.j]
        if (nextCell === WALL || nextCell === GHOST) return;
        // game over if not ate power food
        if (nextCell === PACMAN) {
            if (!gPacman.isSuper) {
                loseGame();
                return;
            }
            // if ghosts meets powered pacman
            removeGhost(ghost);
            return;
        }
        // update the model
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        // update the DOM
        renderCell(ghost.location, ghost.currCellContent);
        //Move the ghost
        ghost.location = nextLocation;
        // update the model
        ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        // update the DOM
        renderCell(ghost.location, getGhostHTML(ghost));
    }
}
// removes ghost entierly DOM+Model
function removeGhost(ghost) {
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    renderCell(ghost.location, ghost.currCellContent);
    var removeIdx = gGhosts.indexOf(ghost);
    gGhosts.splice(removeIdx, 1);
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 };
    } else if (randNum <= 50) {
        return { i: -1, j: 0 };
    } else if (randNum <= 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}
function getGhostHTML(ghost) {
    return `<span style="background-color: ${ghost.color};">${GHOST}</span>`
}
function updateGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'blue';
    }
}
function resetGhostsColors() {
    if (!gGhosts.length) {
        clearInterval(gIntervalGhosts);
        createGhosts(gBoard);
        return;
    }
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor();
    }
}