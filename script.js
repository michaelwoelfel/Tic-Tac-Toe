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

let gameEnded = false;

function render() {
  document.querySelector('.player1').style.backgroundColor = 'whitesmoke';
  
    let contentContainer = document.getElementById("content");
    let table = "<table>";
    for (let i = 0; i < 9; i++) {
        let fieldValue = fields[i];
      if (i % 3 === 0) {
        table += `<tr class="tr${i}">`; }
      table += insertHTML(i,fieldValue);
      if ((i + 1) % 3 === 0) {
        table += `</tr>`;} }
    table += "</table>";
    contentContainer.innerHTML = table;
  }

  
  function insertHTML(i,fieldValue) {
    return `<td class="td${i}" onclick="makeMove(${i})">${fieldValue === "circle" ?  
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="130" height="130">
    <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    <g transform="rotate(45, 65, 65)">
      <circle cx="65" cy="65" r="45" stroke="blue" stroke-width="20" fill="transparent">
        <animate attributeName="r" from="0" to="45" dur="0.5s" fill="freeze" />
      </circle>
    </g>
  </svg>
  ` : fieldValue === "cross" ? 
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="130" height="130">
    <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    <g transform="rotate(45, 65, 65)">
      <line x1="0" y1="65" x2="0" y2="65" stroke="red" stroke-width="20" stroke-linecap="round">
        <animate attributeName="x2" from="0" to="125" dur="0.5s" fill="freeze" />
      </line>
      <line x1="65" y1="0" x2="65" y2="0" stroke="red" stroke-width="20" stroke-linecap="round">
        <animate attributeName="y2" from="0" to="125" dur="0.5s" fill="freeze" />
      </line>
    </g>
  </svg>
  ` : ""}</td>`;
  }

  function getWinningCombination() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];
  
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
  

  
  function makeMove(index) {
    if (!gameEnded && fields[index] === null) {
      const previousPlayer = currentPlayer;
      fields[index] = currentPlayer;
      const fieldElement = document.querySelector(`.td${index}`);
      fieldElement.innerHTML = insertHTML(index, currentPlayer);

      const player1Div = document.querySelector('.player1');
      const player2Div = document.querySelector('.player2');
      
      if (currentPlayer === "cross") {
        player1Div.style.backgroundColor = "";
        player2Div.style.backgroundColor = "whitesmoke";
      } else if (currentPlayer === "circle") {
        player1Div.style.backgroundColor = "whitesmoke";
        player2Div.style.backgroundColor = "";
      }
      
      if (checkWin()) {
        gameEnded = true;
        const { combination, type } = getWinningCombination();
  
        // Markiere die gewinnende Spalte oder Zeile
        if (type === "vertical" || type === "horizontal" || type === "diagonal") {
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
        // Zeige den Gewinner in einem Alert an
        setTimeout(() => {
          alert("Spieler " + previousPlayer + " hat gewonnen!");
          resetBoard();
        }, 1000);
  
      } else if (checkTie()) {
        gameEnded = true;
        setTimeout(() => {
          alert("Unentschieden!");
          resetBoard();
        }, 1000);
      }
  
      currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
    }
  }
  
  
  
  
  
  
  
  
  
  
function checkWin() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
        return true;
      }
    }
    return false;
  }

  function checkTie() {
    for (let field of fields) {
      if (field === null) {
        return false;
      }
    }
    return true;
  }
  
  function resetBoard() {
    currentPlayer = "cross";
    fields = [
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
  }
  
  
  
  




