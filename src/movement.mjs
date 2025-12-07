export function makeMove(piece, finalPosition, unidadD) {

    const [finalCol, finalRow] = finalPosition;

    const pContainer = document.querySelector(`[data-id="${piece.pId}"]`);
    piece.file = finalCol;
    piece.rank = finalRow;

    const pixelC = finalCol * unidadD;
    const pixelR = finalRow * unidadD;

    pContainer.style.transform = `translate(${pixelC}px, ${pixelR}px)`;
}


export function initialPositionAllPieces(pieces, unidadD) {

    pieces.forEach(piece => {

        const finalCol = piece.file;
        const finalRow = piece.rank;

        makeMove(piece, [finalCol, finalRow], unidadD);
    });
}


export function moveValidation(piece, destinationSquare) {

    const fileDiff = Math.abs(destinationSquare.file - piece.file);
    const rankDiff = Math.abs(destinationSquare.rank - piece.rank);
    const rankDirection = destinationSquare.rank - piece.rank;

    switch (piece.notation) {

        case "P":

            let forward;

            if (piece.color === "white") {
                forward = -1;
            } else {
                forward = 1;
            }

            if (rankDirection * forward <= 0) {
                return { message: "Invalid", validMove: false };
            }

            if (rankDirection === 2 * forward && fileDiff === 0) {

                let startRank;

                if (piece.color === "white") {
                    startRank = 6;
                } else {
                    startRank = 1;
                }

                if (piece.rank === startRank) {
                    return true;
                }

                return { message: "Invalid", validMove: false };
            }

            if (rankDirection === forward) {

                if (fileDiff === 0) {
                    return true;
                }

                if (fileDiff === 1) {
                    return true;
                }

                return { message: "Invalid", validMove: false };
            }

            return { message: "Invalid", validMove: false };


        case "R":

            if (piece.rank === destinationSquare.rank) {
                return true;
            }

            if (piece.file === destinationSquare.file) {
                return true;
            }

            return { message: "Invalid", validMove: false };


        case "N":

            if (fileDiff === 1 && rankDiff === 2) {
                return true;
            }

            if (fileDiff === 2 && rankDiff === 1) {
                return true;
            }

            return { message: "Invalid", validMove: false };


        case "B":

            if (fileDiff === rankDiff) {
                return true;
            }

            return { message: "Invalid", validMove: false };


        case "Q":

            if (fileDiff === rankDiff) {
                return true;
            }

            if (piece.rank === destinationSquare.rank) {
                return true;
            }

            if (piece.file === destinationSquare.file) {
                return true;
            }

            return { message: "Invalid", validMove: false };


        case "K":

            if (fileDiff <= 1 && rankDiff <= 1) {

                if (fileDiff === 0 && rankDiff === 0) {
                    return { message: "Invalid", validMove: false };
                }

                return true;
            }

            return { message: "Invalid", validMove: false };


        default:
            return { message: "Invalid", validMove: false };
    }
}


// export function castling(piecesData, file, rank) {

//     if (file === 2 && rank === 7) {
//         return findPiece(0, 7, piecesData);
//         // castling queen side 
//     }

//     else {

//         if (file === 6 && rank === 7) {
//             return findPiece(6, 7, piecesData);
//         }
//         // castling king side
//     }

// }
