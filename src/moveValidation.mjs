
import { validateKingMove, validateQueenMove } from "./kingAndQueen.mjs";
import { validateBishopMove, validateKnightMove} from "./knightAndBishop.mjs";
import {validateRookMove, validatePawnMove} from "./rookAndPawn.mjs";

export function moveValidation(piece, destinationSquare, boardData, piecesData) {

    let potentialSquares;
    let isValid;

    switch (piece.notation) {

        case "P":
            potentialSquares = validatePawnMove(piece, boardData, piecesData);
            isValid = potentialSquares.some( validS => destinationSquare.square === validS.square);

            return isValid;

        case "R":

            potentialSquares = validateRookMove(piece, boardData, piecesData);
            isValid = potentialSquares.some( validS => destinationSquare.square === validS.square);

            return isValid;

        case "N":

            potentialSquares = validateKnightMove(piece, boardData, piecesData);
            isValid = potentialSquares.some( validS => destinationSquare.square === validS.square);

            return isValid;

        case "B":

            potentialSquares = validateBishopMove(piece, boardData, piecesData);
            isValid = potentialSquares.some( validS => destinationSquare.square === validS.square);

            return isValid;

        case "Q":

            potentialSquares = validateQueenMove(piece, boardData, piecesData);
            isValid = potentialSquares.some( validS => destinationSquare.square === validS.square);

            return isValid;

        case "K":
            potentialSquares = validateKingMove(piece, boardData, piecesData);
            isValid = potentialSquares.some( validS => destinationSquare.square === validS.square);

            return isValid;


        default:
            return { message: "Invalid", validMove: false };
    }
}

