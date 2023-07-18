export const transformGenerateSudoku = (sudoku, solvedSudoku) => {
  let board = {};
  sudoku.forEach((row, rowIndex) => {
    let rowObject = {};
    row.forEach((cell, cellIndex) => {
      rowObject[`C${cellIndex + 1}`] = {
        name: `R${rowIndex + 1}C${cellIndex + 1}`,
        isgiven: cell !== 0,
        isFilled: cell !== 0,
        value: cell,
        correctValue: solvedSudoku[rowIndex][cellIndex],
        notes: [],
      };
    });
    board[`R${rowIndex + 1}`] = rowObject;
  });
  return board;
};