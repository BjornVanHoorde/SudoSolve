export const solveSudoku = (sudoku) => {
  let solvedSudoku = JSON.parse(JSON.stringify(sudoku)); // Create a deep copy of the original sudoku

  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      if (sudoku[`R${i}`][`C${j}`].value === 0) {
        solvedSudoku[`R${i}`][`C${j}`].value =
          sudoku[`R${i}`][`C${j}`].correctValue;
      }
      if (!sudoku[`R${i}`][`C${j}`].isFilled) {
        solvedSudoku[`R${i}`][`C${j}`].isFilled = true;
      }
    }
  }

  return solvedSudoku;
};
