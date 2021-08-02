'use strict'
const PACMAN = '😷';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        rotation: null
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev);
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === CHERRY) updateScore(10);
    if (nextCell === POWERFOOD) {
        if (gPacman.isSuper) return;
        updatePower();
    }
    // meets a ghost
    else if (nextCell === GHOST) {
        // if not super powered gameOver
        if (!gPacman.isSuper) {
            loseGame();
            renderCell(gPacman.location, EMPTY);
            return;
        }
        // if super powered send nextLocation - get ghost - remove said ghost
        var ghost = getGhost(nextLocation);
        removeGhost(ghost);
        updateScore(1);
    }

    //  update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    //  update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML());
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.rotation = 'up';
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.rotation = 'down';
            break;
            case 'ArrowLeft':
                nextLocation.j--;
                gPacman.rotation = 'left';
                break;
                case 'ArrowRight':
                    nextLocation.j++;
                    gPacman.rotation = 'right';
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getPacmanHTML() {
    var rotationClass;
    switch (gPacman.rotation) {
        case 'up':
            rotationClass = 'up'
            break;
        case 'down':
            rotationClass = 'down'
            break;
        case 'left':
            rotationClass = 'left'
            break;
        case 'right':
            rotationClass = 'right'
            break;
        default:
            break;
    }
    if (gPacman.isSuper) {
        return `<span class="super ${rotationClass}">${PACMAN}</span>`;
    }
    return `<span class="${rotationClass}" style="background-color: transparent;">${PACMAN}</span>`;
}
