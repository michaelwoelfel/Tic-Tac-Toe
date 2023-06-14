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

  function makeMove(index) {
    if (!gameEnded && fields[index] === null) {
      const previousPlayer = currentPlayer;
      fields[index] = currentPlayer;
      const fieldElement = document.querySelector(`.td${index}`);
      fieldElement.innerHTML = insertHTML(index, currentPlayer);
      if (checkWin()) {
        gameEnded = true;
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
    render();
  }
  




