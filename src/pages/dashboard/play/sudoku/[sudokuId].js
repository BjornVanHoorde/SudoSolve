// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import {
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useAuthContext } from "src/auth/useAuthContext";
import Iconify from "src/components/iconify/Iconify";
import { useSettingsContext } from "src/components/settings";
import {
  fb_create_savedSudoku,
  fb_update_savedSudoku,
} from "src/firebase/apis/savedSudokus";
import { dataContext } from "src/firebase/dataProvider";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import Sudoku from "src/sections/play/Sudoku";
import SudokuControls from "src/sections/play/SudokuControls";
import { isMobileContext } from "src/utils/isMobileProvider";
import { usePageFocus } from "src/hooks/usePageFocus";
import { usePageVisibility } from "src/hooks/usePageVisibility";

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
  const selectedSavedSudokuRef = useRef();
  const timerRef = useRef();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [selectedSudoku, setSelectedSudoku] = useState(null);
  const [selectedSavedSudoku, setSelectedSavedSudoku] = useState(null);
  const [settings, setSettings] = useState(null);

  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedNumber, setHighlightedNumber] = useState(null);

  const [isTimerSet, setIsTimerSet] = useState(false);
  const [savingState, setSavingState] = useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({
    autoStart: true,
  });

  const isVisible = usePageVisibility();
  const isFocussed = usePageFocus();

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

      setSavingState(true);
      fb_update_savedSudoku(selectedSavedSudoku.sudokuId, {
        ...selectedSavedSudoku,
        time: {
          seconds: seconds,
          minutes: minutes,
        },
      }).then(() => {
        setSavingState(false);
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

      setSavingState(true);
      fb_update_savedSudoku(selectedSavedSudoku.sudokuId, {
        ...selectedSavedSudoku,
        time: {
          seconds: seconds,
          minutes: minutes,
        },
      }).then(() => {
        setSavingState(false);
      });
    }
  };

  const handlePaletteClick = (color) => {
    if (selectedCells.length === 0) return;

    const newBoard = { ...selectedSavedSudoku.board };
    selectedCells.forEach((cell) => {
      if (newBoard[cell.row][cell.col].isGiven) return;
      newBoard[cell.row][cell.col].color = color;
    });
    setSelectedSavedSudoku({
      ...selectedSavedSudoku,
      board: newBoard,
    });

    setSavingState(true);
    fb_update_savedSudoku(selectedSavedSudoku.sudokuId, {
      ...selectedSavedSudoku,
      time: {
        seconds: seconds,
        minutes: minutes,
      },
    }).then(() => {
      setSavingState(false);
    });
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (sudokuId && sudokus && savedSudokus && !savingState) {
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
          time: {
            seconds: 0,
            minutes: 0,
          },
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
    if (savingState) return;
    if (selectedCells.length === 1) {
      setHighlightedNumber(
        selectedSavedSudoku?.board[selectedCells[0].row][selectedCells[0].col]
          .value
      );
    } else {
      setHighlightedNumber(null);
    }
  }, [selectedCells, selectedSavedSudoku]);

  useEffect(() => {
    const autosave = setInterval(() => {
      if (selectedSavedSudokuRef.current) {
        setSavingState(true);
        fb_update_savedSudoku(selectedSavedSudokuRef.current.sudokuId, {
          ...selectedSavedSudokuRef.current,
          time: {
            seconds: timerRef.current.seconds,
            minutes: timerRef.current.minutes,
          },
        }).then(() => {
          setSavingState(false);
        });
      }
    }, 10 * 1000); // runs every 10s
    return () => {
      clearInterval(autosave); // clear autosave on dismount
    };
  }, []);

  useEffect(() => {
    if (savingState) return;
    selectedSavedSudokuRef.current = selectedSavedSudoku;
  }, [selectedSavedSudoku]);

  useEffect(() => {
    if (!selectedSavedSudoku) return;
    if (isTimerSet) {
      timerRef.current = {
        seconds,
        minutes,
      };
    } else {
      timerRef.current = {
        seconds: selectedSavedSudoku.time.seconds,
        minutes: selectedSavedSudoku.time.minutes,
      };
      const offsetTimestamp = new Date();
      offsetTimestamp.setSeconds(
        offsetTimestamp.getSeconds() + timerRef.current.seconds
      );
      offsetTimestamp.setMinutes(
        offsetTimestamp.getMinutes() + timerRef.current.minutes
      );

      reset(offsetTimestamp);
      setIsTimerSet(true);
    }
  }, [selectedSavedSudoku, seconds, minutes, reset]);

  useEffect(() => {
    if (isVisible && isFocussed) {
      start();
    } else {
      pause();
    }
  }, [isVisible, isFocussed]);

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
                      isRunning={isRunning}
                    />
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Stack spacing={2}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h4">{`${
                        minutes < 10 ? "0" + minutes : minutes
                      }:${seconds < 10 ? "0" + seconds : seconds}`}</Typography>
                      <IconButton
                        onClick={() => {
                          if (isRunning) {
                            pause();
                          } else {
                            start();
                          }
                        }}
                      >
                        <Iconify icon={isRunning ? "mdi:pause" : "mdi:play"} />
                      </IconButton>
                    </Stack>
                  </Card>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <SudokuControls
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                      onNumberClick={handleNumberClick}
                      handleNoteClick={handleNoteClick}
                      handlePaletteClick={handlePaletteClick}
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
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h4">{`${
                        minutes < 10 ? "0" + minutes : minutes
                      }:${seconds < 10 ? "0" + seconds : seconds}`}</Typography>
                      <IconButton
                        onClick={() => {
                          if (isRunning) {
                            pause();
                          } else {
                            start();
                          }
                        }}
                      >
                        <Iconify icon={isRunning ? "mdi:pause" : "mdi:play"} />
                      </IconButton>
                    </Stack>
                  </Card>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <SudokuControls
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                      onNumberClick={handleNumberClick}
                      handleNoteClick={handleNoteClick}
                      handlePaletteClick={handlePaletteClick}
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
                      isRunning={isRunning}
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
