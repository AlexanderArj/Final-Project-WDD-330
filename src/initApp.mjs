import Board from "./board.mjs";
import { getSquares, getPieces, getDailyPuzzle, getRandomPuzzle } from "./chessSetUp.mjs";
import { createAllPieces } from "./piecesFactory.mjs";
import { initialPositionAllPieces, makeMove } from "./movement.mjs";
import { findPieceByPgn } from "./findPiecePgn.mjs";
import { getMoves, splitMoves, splitAlgebraicNotation, getPgnMoves, pgnEachMoveToArray, getTestMoves } from "./readMove.mjs";
import { resizeBoard, sleepPgn, deletePiece } from "./utils.mjs";
import { displayMoves, highlightMove} from "./moveNotation.mjs";

export async function initApp() {
  const tablero = document.getElementById('chess-board');

  const boardData = await getSquares();
  let piecesData = await getPieces();

  const unidadPX = tablero.clientWidth / 8;

  const board = new Board(boardData, tablero);
  board.init();

  await createAllPieces();

  initialPositionAllPieces(piecesData, unidadPX);
  
  window.addEventListener("resize", resizeBoard);

  resizeBoard();

  const dailyPuzzleMoves = await getDailyPuzzle();
  console.log(dailyPuzzleMoves);
  const pgnMoves = dailyPuzzleMoves.game.pgn;

  const pgnMovesToPlay = getPgnMoves(pgnMoves);

  displayMoves(pgnMovesToPlay);

  async function playPgn() {
    for (let i = 0; i < pgnMovesToPlay.length; i++) {
      let pcolor = i === 0 || i % 2 === 0 ? 'white' : 'black';

      const pgnNotation = pgnEachMoveToArray(pgnMovesToPlay[i]);
      console.log(pgnNotation);

      const pieceAndSquare = findPieceByPgn(piecesData, boardData, pgnNotation, pcolor);
      console.log(pieceAndSquare);

      let piecePgnToMove;
      let finalSquare;
      let king;
      let rookToMovePgn;

      if (pieceAndSquare.length === 2) {
        piecePgnToMove = pieceAndSquare[0];
        finalSquare = pieceAndSquare[1];

        let enemyPiece = piecesData.find(ep => ep.file === finalSquare.file && ep.rank === finalSquare.rank && ep.color !== piecePgnToMove.color);

        if (enemyPiece) {
          let enemyPieceContainer = document.querySelector(`[data-id="${enemyPiece.pId}"]`);
          piecesData = piecesData.filter(p => p.pId !== enemyPiece.pId);
          deletePiece(tablero, enemyPieceContainer);
        }

        highlightMove(i);

        makeMove(piecePgnToMove, [finalSquare.file, finalSquare.rank], unidadPX);

      } 
      
      else {
        king = pieceAndSquare[0];
        rookToMovePgn = pieceAndSquare[2];
        makeMove(king, [pieceAndSquare[1][0], pieceAndSquare[1][1]], unidadPX);
        makeMove(rookToMovePgn, [pieceAndSquare[3][0], pieceAndSquare[3][1]], unidadPX);
      }

      await sleepPgn(2000);
    }
  }

  playPgn();
}
