export const isSolved = (board) => {
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      if (
        board[`R${i}`][`C${j}`].value !== board[`R${i}`][`C${j}`].correctValue
      ) {
        return false;
      }
    }
  }
  return true;
};

export const checkIfSolved = (level, savedLevels) => {
  if (!savedLevels) return false;

  const savedLevel = savedLevels.find(
    (savedLevel) => savedLevel.originalSudokuId === level.sudokuId
  );

  return savedLevel?.isSolved;
};
