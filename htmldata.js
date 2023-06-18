function insertHTML(i, fieldValue) {
    return `<td class="td${i}" onclick="makeMove(${i})">${fieldValue === "circle" ?
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="130" height="130">
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <g transform="rotate(45, 65, 65)">
        <circle cx="65" cy="65" r="45" stroke="blue" stroke-width="20" fill="transparent">
          <animate attributeName="r" from="0" to="45" dur="0.5s" fill="freeze" /></circle> </g>  </svg>`
        : fieldValue === "cross" ?
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="130" height="130">
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      <g transform="rotate(45, 65, 65)">
        <line x1="0" y1="65" x2="0" y2="65" stroke="red" stroke-width="20" stroke-linecap="round">
          <animate attributeName="x2" from="0" to="125" dur="0.5s" fill="freeze" />
        </line>
        <line x1="65" y1="0" x2="65" y2="0" stroke="red" stroke-width="20" stroke-linecap="round">
          <animate attributeName="y2" from="0" to="125" dur="0.5s" fill="freeze" /> </line>  </g></svg>` : ""}</td>`;
}


function insertwinMessage(svg) {
    return `<div class=win><div class=winplayer>Player ${svg} wins!
     </div> <button id="replay-button" class="replaybutton">Replay</button></div> `;
}


function insertTiemessage() {
    return `<div class=win><div class=winplayertie>Draw!
     </div> <button id="replay-button" class="replaybutton">Replay</button></div> `;
}
