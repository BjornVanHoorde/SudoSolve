import { getDifficulty } from "./getDifficulty";
import { solveSudoku } from "./solveSudoku";
import { transformGenerateSudoku } from "./transformGenratedSudoku";

export const createSudoku = async (sudokuString) => {
  return new Promise(async (resolve, reject) => {
    const sudoku = [];
    let row = [];
    for (let i = 0; i < sudokuString.length; i++) {
      row.push(sudokuString[i] === "." ? 0 : Number(sudokuString[i]));
      if (row.length === 9) {
        sudoku.push(row);
        row = [];
      }
    }

    // count the number of empty cells
    let emptyCells = 0;
    for (let i = 0; i < sudoku.length; i++) {
      for (let j = 0; j < sudoku[i].length; j++) {
        if (sudoku[i][j] === 0) {
          emptyCells++;
        }
      }
    }

    try {
      // solve the sudoku
      const response = await fetch(
        "https://europe-west1-project-bjorn.cloudfunctions.net/solveSudoku",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sudoku }),
        }
      );

      const data = await response.json();
      const solvedSudoku = data.solvedSudoku;
      const transformedSudoku = transformGenerateSudoku(sudoku, solvedSudoku);

      const returnValue = {
        sudoku: transformedSudoku,
        emptyCells,
        difficulty: getDifficulty(transformedSudoku),
        solvedSudoku: solveSudoku(transformedSudoku),
      };

      resolve(returnValue);
    } catch (error) {
      reject(error);
    }
  });
};
