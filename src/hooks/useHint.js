import { useCallback, useEffect, useState } from "react";

const simplifySudoku = (sudoku) => {
  let simpleSudoku = [];
  for (let i = 1; i <= 9; i++) {
    let row = [];
    for (let j = 1; j <= 9; j++) {
      row.push(sudoku[`R${i}`][`C${j}`].value);
    }
    simpleSudoku.push(row);
  }
  return simpleSudoku;
};

const getLastEmptyCell = (sudoku) => {
  let lastEmptyCell = null;

  // Check for last empty cell in row
  sudoku.forEach((row) => {
    const amountOfEmptyCells = row.filter((cell) => cell === 0).length;
    if (amountOfEmptyCells === 1) {
      lastEmptyCell = {
        cell: `R${sudoku.indexOf(row) + 1}C${row.indexOf(0) + 1}`,
        type: "row",
      };
    }
  });

  // Check for last empty cell in column
  if (!lastEmptyCell) {
    for (let i = 0; i < 9; i++) {
      let column = [];
      sudoku.forEach((row) => {
        column.push(row[i]);
      });
      const amountOfEmptyCells = column.filter((cell) => cell === 0).length;
      if (amountOfEmptyCells === 1) {
        lastEmptyCell = {
          cell: `R${column.indexOf(0) + 1}C${i + 1}`,
          type: "column",
        };
      }
    }
  }

  // Check for last empty cell in box
  if (!lastEmptyCell) {
    for (let i = 0; i < 9; i++) {
      let box = [];
      const rowStart = Math.floor(i / 3) * 3;
      const columnStart = (i % 3) * 3;
      for (let j = rowStart; j < rowStart + 3; j++) {
        for (let k = columnStart; k < columnStart + 3; k++) {
          box.push(sudoku[j][k]);
        }
      }
      const amountOfEmptyCells = box.filter((cell) => cell === 0).length;
      if (amountOfEmptyCells === 1) {
        const row = Math.floor(box.indexOf(0) / 3) + rowStart + 1;
        const column = (box.indexOf(0) % 3) + columnStart + 1;
        lastEmptyCell = {
          cell: `R${row}C${column}`,
          type: "box",
          box: i + 1,
        };
      }
    }
  }

  if (lastEmptyCell) {
    return lastEmptyCell;
  }
};

const solveLastEmptyCell = (sudoku, lastEmptyCell) => {
  const row = lastEmptyCell.cell[1] - 1;
  const column = lastEmptyCell.cell[3] - 1;

  let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let answer = null;

  // Solve the last empty cell in row
  if (lastEmptyCell.type === "row") {
    sudoku[row].forEach((digit) => {
      if (digit !== 0) {
        possibleValues.splice(possibleValues.indexOf(digit), 1);
      }
    });

    if (possibleValues.length === 1) {
      answer = possibleValues[0];
    }
  }

  // Solve the last empty cell in column
  if (lastEmptyCell.type === "column") {
    for (let i = 0; i < 9; i++) {
      if (sudoku[i][column] !== 0) {
        possibleValues.splice(possibleValues.indexOf(sudoku[i][column]), 1);
      }
    }

    if (possibleValues.length === 1) {
      answer = possibleValues[0];
    }
  }

  // Solve the last empty cell in box
  if (lastEmptyCell.type === "box") {
    const rowStart = Math.floor((lastEmptyCell.box - 1) / 3) * 3;
    const columnStart = ((lastEmptyCell.box - 1) % 3) * 3;

    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = columnStart; j < columnStart + 3; j++) {
        if (sudoku[i][j] !== 0) {
          possibleValues.splice(possibleValues.indexOf(sudoku[i][j]), 1);
        }
      }
    }

    if (possibleValues.length === 1) {
      answer = possibleValues[0];
    }
  }

  if (answer) {
    return answer;
  }
};

const fillInAllNotes = (sudoku) => {
  let notes = [];

  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        let cellNotes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Remove notes from row
        sudoku[i].forEach((digit) => {
          if (digit !== 0) {
            cellNotes.splice(cellNotes.indexOf(digit), 1);
          }
        });

        // Remove notes from column
        for (let k = 0; k < 9; k++) {
          if (sudoku[k][j] !== 0) {
            if (cellNotes.indexOf(sudoku[k][j]) !== -1) {
              cellNotes.splice(cellNotes.indexOf(sudoku[k][j]), 1);
            }
          }
        }

        // Remove notes from box
        const rowStart = Math.floor(i / 3) * 3;
        const columnStart = Math.floor(j / 3) * 3;
        for (let k = rowStart; k < rowStart + 3; k++) {
          for (let l = columnStart; l < columnStart + 3; l++) {
            if (sudoku[k][l] !== 0) {
              if (cellNotes.indexOf(sudoku[k][l]) !== -1) {
                cellNotes.splice(cellNotes.indexOf(sudoku[k][l]), 1);
              }
            }
          }
        }

        row.push(cellNotes);
      } else {
        row.push([]);
      }
    }
    notes.push(row);
  }

  return notes;
};

const getNakedSingle = (notes) => {
  let nakedSingle = null;

  notes.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.length === 1 && !nakedSingle) {
        nakedSingle = {
          cell: `R${i + 1}C${j + 1}`,
          value: cell[0],
        };
      }
    });
  });

  return nakedSingle;
};

const getHiddenSingle = (notes) => {
  let hiddenSingle = null;

  // Check rows
  notes.forEach((row, i) => {
    let rowNotes = [];
    row.forEach((cell) => {
      rowNotes.push(cell);
    });

    let rowNotesFlat = rowNotes.flat();
    let rowNotesFlatUnique = [...new Set(rowNotesFlat)];

    rowNotesFlatUnique.forEach((note) => {
      if (rowNotesFlat.filter((x) => x === note).length === 1) {
        rowNotes.forEach((cell, j) => {
          if (cell.includes(note) && !hiddenSingle) {
            hiddenSingle = {
              cell: `R${i + 1}C${
                rowNotes
                  .map((x) => {
                    if (x.includes(note)) {
                      return note;
                    }
                  })
                  .indexOf(note) + 1
              }`,
              value: note,
              row: i + 1,
            };
          }
        });
      }
    });
  });

  // Check columns
  if (!hiddenSingle) {
    for (let i = 0; i < 9; i++) {
      let columnNotes = [];
      for (let j = 0; j < 9; j++) {
        columnNotes.push(notes[j][i]);
      }

      let columnNotesFlat = columnNotes.flat();
      let columnNotesFlatUnique = [...new Set(columnNotesFlat)];

      columnNotesFlatUnique.forEach((note) => {
        if (columnNotesFlat.filter((x) => x === note).length === 1) {
          columnNotes.forEach((cell, j) => {
            if (cell.includes(note) && !hiddenSingle) {
              hiddenSingle = {
                cell: `R${
                  columnNotes
                    .map((x) => {
                      if (x.includes(note)) {
                        return note;
                      }
                    })
                    .indexOf(note) + 1
                }C${i + 1}`,
                value: note,
                column: i + 1,
              };
            }
          });
        }
      });
    }
  }

  // Check boxes
  if (!hiddenSingle) {
    for (let i = 0; i < 9; i++) {
      let boxNotes = [];
      const rowStart = Math.floor(i / 3) * 3;
      const columnStart = (i % 3) * 3;
      for (let j = rowStart; j < rowStart + 3; j++) {
        for (let k = columnStart; k < columnStart + 3; k++) {
          boxNotes.push(notes[j][k]);
        }
      }

      let boxNotesFlat = boxNotes.flat();
      let boxNotesFlatUnique = [...new Set(boxNotesFlat)];

      boxNotesFlatUnique.forEach((note) => {
        if (boxNotesFlat.filter((x) => x === note).length === 1) {
          boxNotes.forEach((cell, j) => {
            if (cell.includes(note) && !hiddenSingle) {
              console.log(rowStart);
              console.log(columnStart);
              hiddenSingle = {
                cell: `R${Math.floor((rowStart + j) / 3) + 1}C${
                  Math.floor((columnStart + j) % 3) + 1 + columnStart
                }`,
                value: note,
                box: i + 1,
              };
            }
          });
        }
      });
    }
  }

  return hiddenSingle;
};

const generateHint = (type, props, answer) => {
  if (type === "lastEmptyCell") {
    return `Last empty cell in ${
      props.lastEmptyCell.type === "row"
        ? "R"
        : props.lastEmptyCell.type === "column"
        ? "C"
        : "box"
    }${
      props.lastEmptyCell.type === "row"
        ? props.lastEmptyCell.cell[1]
        : props.lastEmptyCell.type === "column"
        ? props.lastEmptyCell.cell[3]
        : props.lastEmptyCell.box
    } is ${answer}`;
  }

  if (type === "nakedSingle") {
    return `Naked single in ${props.nakedSingle.cell} is ${props.nakedSingle.value}`;
  }

  if (type === "hiddenSingle") {
    return `Hidden single in ${props.hiddenSingle.cell} in ${
      props.hiddenSingle.row
        ? `R${props.hiddenSingle.row}`
        : props.hiddenSingle.column
        ? `C${props.hiddenSingle.column}`
        : `box${props.hiddenSingle.box}`
    } is ${props.hiddenSingle.value}`;
  }
};

export const useHint = (sudoku) => {
  const [hint, setHint] = useState("No hint available");

  useEffect(() => {
    setHint("No hint available");

    const simpleSudoku = simplifySudoku(sudoku.board);

    // Last empty cell method
    const lastEmptyCell = getLastEmptyCell(simpleSudoku);
    if (lastEmptyCell) {
      // console.log(lastEmptyCell);
      const answer = solveLastEmptyCell(simpleSudoku, lastEmptyCell);
      if (answer) {
        setHint(generateHint("lastEmptyCell", { lastEmptyCell }, answer));
      }
      return;
    }

    // Fill in all notes
    const notes = fillInAllNotes(simpleSudoku);

    // Naked single method
    const nakedSingle = getNakedSingle(notes);
    if (nakedSingle) {
      setHint(generateHint("nakedSingle", { nakedSingle }));
      return;
    }

    // Hidden single method
    const hiddenSingle = getHiddenSingle(notes);
    if (hiddenSingle) {
      setHint(generateHint("hiddenSingle", { hiddenSingle }));
      return;
    }

    // Naked pair method
    // Hidden pair method
    // Naked triple method
    // Hidden triple method
    // Naked quad method
    // Hidden quad method
  }, [sudoku]);

  return {
    hint,
  };
};
