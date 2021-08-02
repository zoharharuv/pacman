function renderMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getEmptyCell() {
  var emptyCells = getEmptyCells();
  var idx = getRandomIntInclusive(0, emptyCells.length-1);
  var emptyCell = emptyCells[idx];
  return emptyCell;
}

function getEmptyCells() {
  var emptyCells = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === FOOD || board[i][j] === EMPTY) {
        emptyCells.push({ i: i, j: j });
      }
    }
  }
  return emptyCells;
}

function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
      newMat[i] = []
      // newMat[i] = mat[i].slice();
      for (var j = 0; j < mat[0].length; j++) {
          newMat[i][j] = mat[i][j];
      }
  }
  return newMat;
}
function getRandomInteger(min, max) {
  var minNum = Math.ceil(min);
  var maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum) + minNum);
}