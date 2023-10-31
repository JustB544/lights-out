import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    function randomLight() {
      return Math.random() < chanceLightStartsOn;
    }
    let initialBoard = [];
    for (let i = 0; i < nrows; i++){
      initialBoard.push([]);
      for (let j = 0; j < ncols; j++){
        initialBoard[i].push(randomLight());
      }
    }
    return initialBoard;
  }

  function hasWon() {
    for (let i = 0; i < nrows; i++){
      for (let j = 0; j < ncols; j++){
        if (board[i][j]) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      console.log(coord);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const new_board = [...oldBoard];

      flipCell(y, x, new_board);
      flipCell(y, x + 1, new_board);
      flipCell(y, x - 1, new_board);
      flipCell(y + 1, x, new_board);
      flipCell(y - 1, x, new_board);
      return new_board;
    });
  }

  if (hasWon()) return (<h1>You won!</h1>);

  return (
    <table className="Board">
      <tbody>
        {board.map((r, idxr) => <tr key={idxr}>
         { r.map((c, idxc) => <Cell key={`${idxr}-${idxc}`} isLit={c} flipCellsAroundMe={evt => flipCellsAround(`${idxr}-${idxc}`)}/>) }
        </tr>)}
      </tbody>
    </table>
  );
}

export default Board;
