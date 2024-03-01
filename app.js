var playerScore = 0;
var computerScore = 0;

var grid = document.getElementById('grid');
var msg = document.querySelector('.message');
var chooser = document.querySelector('form');
var mark;
var cells;

var playAgainButton = document.getElementById('play-again');
playAgainButton.style.display = 'none';

var resetButton = document.getElementById('reset');
resetButton.style.display = 'inline-block'; // Display reset button initially

// add click listener to radio buttons
function setPlayer() {
  mark = this.value;
  msg.textContent = mark + ', click on a square to make your move!';
  chooser.classList.add('game-on');
  this.checked = false;
  buildGrid();
  playAgainButton.style.display = 'inline-block';
  resetButton.style.display = 'none';
}

// add click listener to each cell
function playerMove() {
  if (this.textContent == '') {
    this.textContent = mark;
    if (checkRow()) {
      if (mark == 'X') {
        playerScore++;
      } else {
        computerScore++;
      }
      updateScore();
      return;
    }
    switchMark();
    computerMove();
  }
}

// let the computer make the next move
function computerMove() {
  var emptyCells = [];
  var random;

  cells.forEach(function(cell){
    if (cell.textContent == '') {
      emptyCells.push(cell);
    }
  });
  
  // computer marks a random EMPTY cell
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark;
  if (checkRow()) {
    if (mark == 'X') {
      playerScore++;
    } else {
      computerScore++;
    }
    updateScore();
    return;
  }
  switchMark();
}

// switch player mark
function switchMark() {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
}

// determine a winner
function winner(a, b, c) {
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    msg.textContent = mark + ' is the winner!';
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    return true;
  } else {
    return false;
  }
}

// check cell combinations 
function checkRow() {
  if (winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')) ||
      winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6')) ||
      winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9')) ||
      winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7')) ||
      winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8')) ||
      winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9')) ||
      winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9')) ||
      winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'))) {
    return true;
  }
  return false;
}

// update the score display
function updateScore() {
  document.getElementById('player-score').textContent = playerScore;
  document.getElementById('computer-score').textContent = computerScore;
}

// clear the grid and reset scores
function resetGrid() {
  mark = 'X';
  cells.forEach(function(cell){
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  msg.textContent = 'Choose your player:';
  chooser.classList.remove('game-on');
  grid.innerHTML = '';
}

// build the grid
function buildGrid() {
  for (var i = 1; i <= 9; i++) {
    var cell = document.createElement('li');
    cell.id = 'c' + i;
    cell.addEventListener('click', playerMove, false);
    grid.appendChild(cell);
  }
  cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
}

var players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
  choice.addEventListener('click', setPlayer, false);
});

var resetButton = document.getElementById('reset');
var playAgainButton = document.getElementById('play-again');

// Event listener for the "Play Again" button
playAgainButton.addEventListener('click', function(e) {
  e.preventDefault();
  resetGrid();
  playAgainButton.style.display = 'none';
  resetButton.style.display = 'inline-block'
  
});

// Event listener for the "Reset" button
resetButton.addEventListener('click', function(e) {
  e.preventDefault();
  resetScores();
});

// Reset scores
function resetScores() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
}

