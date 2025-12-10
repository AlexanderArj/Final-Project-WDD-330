
export function validateKnightMove(knight, boardData, piecesData) {

    let potentialSquares = [];
    potentialSquares = boardData.filter(s => {

        let lShape = false;
        let pieceSameColor;

        if (Math.abs(s.file - knight.file) === 1 && Math.abs(s.rank - knight.rank) === 2) {
            lShape = true;
        }

        if (Math.abs(s.file - knight.file) === 2 && Math.abs(s.rank - knight.rank) === 1) {
            lShape = true;
        }

        pieceSameColor = piecesData.find(ps =>
            ps.file === s.file &&
            ps.rank === s.rank &&
            ps.color === knight.color
        );

        return (lShape === true && !pieceSameColor);
    });

    return potentialSquares;
}


export function validateBishopMove(bishop, boardData, piecesData) {

    let potentialSquares = [];

    checkDirection(bishop, 1, 1, piecesData, boardData, potentialSquares);
    checkDirection(bishop, 1, -1, piecesData, boardData, potentialSquares);
    checkDirection(bishop, -1, 1, piecesData, boardData, potentialSquares);
    checkDirection(bishop, -1, -1, piecesData, boardData, potentialSquares);

    return potentialSquares;
}

function checkDirection(bishop, dx, dy, piecesData, boardData, potentialSquares) {
    let f = bishop.file + dx;
    let r = bishop.rank + dy;

    while (f >= 0 && f <= 7 && r >= 0 && r <= 7) {

        let piece = piecesData.find(p => p.file === f && p.rank === r);
        let square = boardData.find(s => s.file === f && s.rank === r);

        if (!square) break;

        if (piece) {

            if (piece.color != bishop.color) {
                potentialSquares.push(square);
            }

            break;
        }

        potentialSquares.push(square);

        f = f + dx;
        r = r + dy;
    }
}
