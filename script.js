let currentPlayer = "cross";

let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6] 
];

let gameEnded = false;

function render() {
  document.querySelector('.player1').style.backgroundColor = `#32F4FC`;
  let contentContainer = document.getElementById("content");
  contentContainer.innerHTML = generateTableHTML();
}

function generateTableHTML() {
  let table = "<table>";
  for (let i = 0; i < 9; i++) {
    let fieldValue = fields[i];
    if (i % 3 === 0) {
      table += `<tr class="tr${i}">`;
    }
    table += insertHTML(i, fieldValue);
    if ((i + 1) % 3 === 0) {
      table += `</tr>`;
    }
  }
  table += "</table>";
  return table;
}


function makeMove(index) {
  if (!gameEnded && fields[index] === null) {
    const previousPlayer = currentPlayer;
    updatePlayer(index);
    if (checkWin()) {
      handleWin(previousPlayer);
    } else if (checkTie()) {
      handleTie();
    }
    togglePlayer();
  }
}


function updatePlayer(index) {
  fields[index] = currentPlayer;
  const fieldElement = document.querySelector(`.td${index}`);
  fieldElement.innerHTML = insertHTML(index, currentPlayer);
}


function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
      return true;
    }
  }
  return false;
}

function handleWin(previousPlayer) {
  gameEnded = true;
  const { combination, type } = getWinningCombination();
  if (type) {
    highlightWinningCells(combination, type);
  }
  setTimeout(() => {
    showWinningMessage(previousPlayer);
    resetBoard();
  }, 1000);
}


function highlightWinningCells(combination, type) {
  const [a, b, c] = combination;
  const winningCells = document.querySelectorAll(`.td${a}, .td${b}, .td${c}`);
  winningCells.forEach((cell) => {
    cell.classList.add("winning-cell");
    if (type === "vertical") {
      cell.classList.add("vertical");
    } else if (type === "diagonal" && combination.toString() === "0,4,8") {
      cell.classList.add("diagonal-1");
    } else if (type === "diagonal" && combination.toString() === "2,4,6") {
      cell.classList.add("diagonal-2");
    }
  });
}




function getWinningCombination() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    const [a, b, c] = combination;
    if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
      let type;
      if (i < 3) type = "horizontal";
      else if (i < 6) type = "vertical";
      else type = "diagonal";
      return { combination, type };
    }
  }
  return { combination: [], type: null };
}


function checkTie() {
  for (let field of fields) {
    if (field === null) {
      return false;
    }
  }
  return true;
}



function showWinningMessage(winner) {
  const winMessage = document.createElement('div');
  let winText = document.createElement('div');
  winMessage.id = 'win-message';
  let svg = winner === 'cross' ? insertHTML(0, 'cross') : insertHTML(0, 'circle');
  winText.innerHTML = insertwinMessage(svg);
  winMessage.appendChild(winText);
  document.body.appendChild(winMessage);
  document.getElementById('replay-button').addEventListener('click', function () {
    resetBoard();
    document.body.removeChild(winMessage);
  });
}

function showTieMessage() {
  const winMessage = document.createElement('div');
  let winText = document.createElement('div');
  winMessage.id = 'win-message';
  winText.innerHTML = insertTiemessage();
  winMessage.appendChild(winText);
  document.body.appendChild(winMessage);
  document.getElementById('replay-button').addEventListener('click', function () {
    resetBoard();
    document.body.removeChild(winMessage);
  });
}


function handleTie() {
  gameEnded = true;
  setTimeout(() => {
    showTieMessage();
    resetBoard();
  }, 1000);
}

function togglePlayer() {
  const player1Div = document.querySelector('.player1');
  const player2Div = document.querySelector('.player2');
  if (currentPlayer === "cross") {
    player1Div.style.backgroundColor = "";
    player2Div.style.backgroundColor = `#32F4FC`;
  } else {
    player1Div.style.backgroundColor = `#32F4FC`;
    player2Div.style.backgroundColor = "";
  }
  currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
}


function resetBoard() {
  currentPlayer = "cross";
  fields = [null, null, null, null, null, null, null, null, null,];
  gameEnded = false;
  const winningFieldStart = document.querySelector('.winning-field-start');
  const winningFieldEnd = document.querySelector('.winning-field-end');
  if (winningFieldStart) {
    winningFieldStart.classList.remove('winning-field-start');
  }
  if (winningFieldEnd) {
    winningFieldEnd.classList.remove('winning-field-end');
  }
  render();
  document.querySelector('.player2').style.backgroundColor = ``;
}
