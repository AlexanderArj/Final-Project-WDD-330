function movesNotationFromArray(movesArray) {

    const turns = [];

    for (let i = 0; i < movesArray.length; i += 2) {
        turns.push({
            white: movesArray[i],
            black: movesArray[i + 1] || "" 
        });
    }

    return turns;
}

function movesTemplate(turns) {
    return `
        <table class="moves-table">
            <tbody>
                ${turns.map((t, i) => `
                    <tr>
                        <td class="move-number">${i + 1}.</td>
                        <td class="move-white move" data-index="${i * 2}">${t.white}</td>
                        <td class="move-black move" data-index="${i * 2 + 1}">${t.black}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}


export function displayMoves(moveArray) {
    const turns = movesNotationFromArray(moveArray);
    const moveNotations = movesTemplate(turns);

    document.getElementById("move-notation").innerHTML = moveNotations;
}

export function highlightMove(moveIndex) {
    const allMoves = document.querySelectorAll("#move-notation .move");

    allMoves.forEach(m => m.classList.remove("current-move"));

    const current = document.querySelector(`.move[data-index="${moveIndex}"]`);

    if (current) {
        current.classList.add("current-move");
        current.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}



