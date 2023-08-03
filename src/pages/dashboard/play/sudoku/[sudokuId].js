// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import { useSettingsContext } from "src/components/settings";
import { fb_create_savedSudoku } from "src/firebase/apis/savedSudokus";
import { dataContext } from "src/firebase/dataProvider";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import Sudoku from "src/sections/play/Sudoku";
import SudokuControls from "src/sections/play/SudokuControls";
import { isMobileContext } from "src/utils/isMobileProvider";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
playSudokuScreen.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function playSudokuScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { isMobile } = useContext(isMobileContext);
  const { savedSudokus, sudokus, users } = useContext(dataContext);
  const { sudokuId } = useRouter().query;

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [selectedSudoku, setSelectedSudoku] = useState(null);
  const [selectedSavedSudoku, setSelectedSavedSudoku] = useState(null);
  const [settings, setSettings] = useState(null);

  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedNumber, setHighlightedNumber] = useState(null);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleCellSelect = (row, col, multiple) => {
    if (multiple) {
      setSelectedCells([...selectedCells, { row, col }]);
    } else {
      if (selectedCells.length === 1) {
        if (selectedCells[0].row === row && selectedCells[0].col === col) {
          setSelectedCells([]);
        } else {
          setSelectedCells([{ row, col }]);
        }
      } else {
        setSelectedCells([{ row, col }]);
      }
    }
  };

  const handleNumberClick = (number) => {
    if (selectedCells.length === 0) {
      setSelectedCells([]);
      setTimeout(() => {
        if (highlightedNumber === number) {
          setHighlightedNumber(null);
        } else {
          setHighlightedNumber(number);
        }
      }, 1);
    }

    if (selectedCells.length > 0) {
      const newBoard = { ...selectedSavedSudoku.board };
      selectedCells.forEach((cell) => {
        if (newBoard[cell.row][cell.col].isGiven) return;
        newBoard[cell.row][cell.col].value = number;
        if (settings.ARRN) {
          // Remove notes from column
          for (let i = 1; i <= 9; i++) {
            const newNotes = [
              ...selectedSavedSudoku.board[`R${i}`][cell.col].notes,
            ];
            if (newNotes.includes(number)) {
              newNotes.splice(newNotes.indexOf(number), 1);
              newBoard[`R${i}`][cell.col].notes = newNotes;
            }
          }
          // Remove notes from row
          for (let i = 1; i <= 9; i++) {
            const newNotes = [
              ...selectedSavedSudoku.board[cell.row][`C${i}`].notes,
            ];
            if (newNotes.includes(number)) {
              newNotes.splice(newNotes.indexOf(number), 1);
              newBoard[cell.row][`C${i}`].notes = newNotes;
            }
          }
          // Remove notes from box
          const startRow =
            cell.row.substring(1) - 1 - ((cell.row.substring(1) - 1) % 3) + 1;
          const startCol =
            cell.col.substring(1) - 1 - ((cell.col.substring(1) - 1) % 3) + 1;
          for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
              const newNotes = [
                ...selectedSavedSudoku.board[`R${i}`][`C${j}`].notes,
              ];
              if (newNotes.includes(number)) {
                newNotes.splice(newNotes.indexOf(number), 1);
                newBoard[`R${i}`][`C${j}`].notes = newNotes;
              }
            }
          }
        }
      });

      setSelectedSavedSudoku({
        ...selectedSavedSudoku,
        board: newBoard,
      });
    }
  };

  const handleNoteClick = (noteNumber) => {
    if (selectedCells.length === 0) {
      setSelectedCells([]);
      setTimeout(() => {
        if (highlightedNumber === noteNumber) {
          setHighlightedNumber(null);
        } else {
          setHighlightedNumber(noteNumber);
        }
      }, 1);
    }

    if (selectedCells.length > 0) {
      const newBoard = { ...selectedSavedSudoku.board };
      selectedCells.forEach((cell) => {
        if (newBoard[cell.row][cell.col].isGiven) return;
        if (noteNumber) {
          if (newBoard[cell.row][cell.col].notes.includes(noteNumber)) {
            newBoard[cell.row][cell.col].notes = newBoard[cell.row][
              cell.col
            ].notes.filter((n) => n !== noteNumber);
          } else {
            newBoard[cell.row][cell.col].notes.push(noteNumber);
          }
        } else {
          newBoard[cell.row][cell.col].notes = [];
        }
      });
      setSelectedSavedSudoku({
        ...selectedSavedSudoku,
        board: newBoard,
      });
    }
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if ((sudokuId, sudokus, savedSudokus)) {
      const sudoku = sudokus.find((s) => s.sudokuId === sudokuId);
      const savedSudoku = savedSudokus.find(
        (s) => s.originalSudokuId === sudokuId && s.userId === user.userId
      );

      if (sudoku) {
        setSelectedSudoku(sudoku);
      }
      if (savedSudoku) {
        setSelectedSavedSudoku(savedSudoku);
      } else {
        if (!sudoku) return;
        fb_create_savedSudoku({
          board: sudoku.board,
          difficulty: sudoku.difficulty,
          userId: user.userId,
          originalSudokuId: sudokuId,
          isSolved: false,
          time: 0,
        });
      }
    }
  }, [sudokuId, sudokus, savedSudokus]);

  useEffect(() => {
    if (user && users.length > 0) {
      const currentUser = users.find((u) => u.userId === user.userId);
      setSettings(currentUser.settings);
    }
  }, [user, users]);

  useEffect(() => {
    if (selectedCells.length === 1) {
      setHighlightedNumber(
        selectedSavedSudoku?.board[selectedCells[0].row][selectedCells[0].col]
          .value
      );
    } else {
      setHighlightedNumber(null);
    }
  }, [selectedCells, selectedSavedSudoku]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------1
  return (
    <>
      <Head>
        <title>SudoSolve</title>
      </Head>

      {settings && (
        <Container maxWidth={themeStretch ? false : "xl"}>
          {settings.BA === "right" && (
            <Grid container spacing={isMobile ? 2 : 3} sx={{ mt: 5 }}>
              <Grid item xs={12} lg={8}>
                <Card sx={{ p: 2 }}>
                  {selectedSavedSudoku && (
                    <Sudoku
                      level={selectedSavedSudoku}
                      size={55}
                      onCellSelect={handleCellSelect}
                      selectedCells={selectedCells}
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                    />
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Stack spacing={2}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4">00:00</Typography>
                  </Card>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <SudokuControls
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                      onNumberClick={handleNumberClick}
                      handleNoteClick={handleNoteClick}
                    />
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          )}
          {settings.BA === "left" && (
            <Grid container spacing={isMobile ? 2 : 3} sx={{ mt: 5 }}>
              <Grid item xs={12} lg={4}>
                <Stack spacing={2}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4">00:00</Typography>
                  </Card>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <SudokuControls
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                      onNumberClick={handleNumberClick}
                      handleNoteClick={handleNoteClick}
                    />
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Card sx={{ p: 2 }}>
                  {selectedSavedSudoku && (
                    <Sudoku
                      level={selectedSavedSudoku}
                      size={55}
                      onCellSelect={handleCellSelect}
                      selectedCells={selectedCells}
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      )}
    </>
  );
}
