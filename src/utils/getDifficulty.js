export const getDifficulty = (board) => {
  let amountOfEmptyCells = 0;
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      if (!board[`R${i}`][`C${j}`].isGiven) {
        amountOfEmptyCells++;
      }
    }
  }
  if (amountOfEmptyCells <= 45) {
    return "novice";
  } else if (amountOfEmptyCells <= 52) {
    return "easy";
  } else if (amountOfEmptyCells <= 58) {
    return "medium";
  } else if (amountOfEmptyCells <= 64) {
    return "hard";
  } else if (amountOfEmptyCells <= 69) {
    return "expert";
  } else {
    return "fiendish";
  }
};
