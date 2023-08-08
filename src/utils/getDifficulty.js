export const getDifficulty = (board) => {
  let amountOfEmptyCells = 0;
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      if (!board[`R${i}`][`C${j}`].isGiven) {
        amountOfEmptyCells++;
      }
    }
  }
  if (amountOfEmptyCells <= 42) {
    return "novice";
  } else if (amountOfEmptyCells <= 47) {
    return "easy";
  } else if (amountOfEmptyCells <= 54) {
    return "medium";
  } else if (amountOfEmptyCells <= 60) {
    return "hard";
  } else {
    return "evil";
  }
};
