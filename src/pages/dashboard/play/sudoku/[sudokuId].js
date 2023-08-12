// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { isSolved } from "src/utils/isSolved";
import { isSolvedAnimation } from "src/utils/isSolvedAnimation";
import Lottie from "lottie-react";
import { PATH_DASHBOARD } from "src/routes/paths";
import { useLocales } from "src/locales";

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
  const { savedSudokus, sudokus, users, userSudokus } = useContext(dataContext);
  const { sudokuId } = useRouter().query;
  const selectedSavedSudokuRef = useRef();
  const timerRef = useRef();
  const { push } = useRouter();
  const { translate } = useLocales();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [selectedSudoku, setSelectedSudoku] = useState(null);
  const [selectedSavedSudoku, setSelectedSavedSudoku] = useState(null);
  const [settings, setSettings] = useState(null);

  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedNumber, setHighlightedNumber] = useState(null);

  const [isTimerSet, setIsTimerSet] = useState(false);
  const [savingState, setSavingState] = useState(false);
  const [isSolvedState, setIsSolvedState] = useState(false);
  const [isSolvedAnimationState, setIsSolvedAnimationState] = useState(false);
  const [isSolvedSaved, setIsSolvedSaved] = useState(false);

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
  // useEffect(() => {
  //   console.log(selectedCells);
  // }, [selectedCells]);

  const handleCellSelect = (row, col, multiple) => {
    if (multiple) {
      if (selectedCells.some((cell) => cell.row === row && cell.col === col))
        return;
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
    // if (selectedCells.length > 0) {
    //   setSelectedCells([]);
    // }
    setTimeout(() => {
      if (highlightedNumber === number) {
        setHighlightedNumber(null);
      } else {
        setHighlightedNumber(number);
      }
    }, 1);

    if (selectedCells.length > 0) {
      const newBoard = { ...selectedSavedSudoku.board };
      if (!number) setHighlightedNumber(null);
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
    // if (selectedCells.length === 0) {
    //   setSelectedCells([]);
    // }
    setTimeout(() => {
      if (highlightedNumber === noteNumber) {
        setHighlightedNumber(null);
      } else {
        setHighlightedNumber(noteNumber);
      }
    }, 1);

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

  const handleBackClick = () => {
    push(PATH_DASHBOARD.play.root);
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (sudokuId && sudokus && savedSudokus && userSudokus && !savingState) {
      let sudoku = null;
      sudoku = sudokus.find((s) => s.sudokuId === sudokuId);
      if (!sudoku) {
        sudoku = userSudokus.find((s) => s.sudokuId === sudokuId);
      }
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
  }, [sudokuId, sudokus, savedSudokus, userSudokus]);

  useEffect(() => {
    if (user && users.length > 0) {
      const currentUser = users.find((u) => u.userId === user.userId);
      setSettings(currentUser.settings);
    }
  }, [user, users]);

  useEffect(() => {
    if (savingState || isSolvedState) return;
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
      if (selectedSavedSudokuRef.current && !isSolvedState) {
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
    if (savingState || isSolvedState) return;
    selectedSavedSudokuRef.current = selectedSavedSudoku;
  }, [selectedSavedSudoku]);

  useEffect(() => {
    if (!selectedSavedSudoku || isSolvedState) return;
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

  useEffect(() => {
    // check if the sudoku is solved
    if (!selectedSavedSudoku || isSolvedSaved) return;
    if (isSolved(selectedSavedSudoku.board)) {
      pause();
      setIsSolvedAnimationState(true);
      setIsSolvedState(true);
      fb_update_savedSudoku(selectedSavedSudoku.sudokuId, {
        ...selectedSavedSudoku,
        isSolved: true,
        time: {
          seconds: seconds,
          minutes: minutes,
        },
      }).then(() => {
        setIsSolvedSaved(true);
      });
    }
  }, [selectedSavedSudoku]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------1
  return (
    <>
      <Head>
        <title>SudoSolve</title>
      </Head>

      {isSolvedAnimationState && (
        <Lottie
          animationData={isSolvedAnimation}
          loop={false}
          autoplay={true}
          onComplete={() => {
            setIsSolvedAnimationState(false);
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 999999,
          }}
        />
      )}

      {isSolvedState && (
        <>
          <Dialog
            open={isSolvedState}
            onClose={() => setIsSolvedState(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {translate("congratulations")}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {translate("youHaveSolvedTheSudoku")}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleBackClick}>{translate("goback")}</Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {settings && (
        <Container maxWidth={themeStretch ? false : "xl"}>
          {settings.BA === "right" && !isMobile && (
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
                      isSolved={isSolvedState}
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
                    {selectedSavedSudoku && (
                      <SudokuControls
                        highlightedNumber={highlightedNumber}
                        settings={settings}
                        onNumberClick={handleNumberClick}
                        handleNoteClick={handleNoteClick}
                        handlePaletteClick={handlePaletteClick}
                        sudoku={selectedSavedSudoku}
                      />
                    )}
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          )}
          {isMobile && (
            <>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{
                  textAlign: "center",
                  position: "fixed",
                  top: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1111,
                }}
              >
                <Typography variant="h6">{`${
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
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  {selectedSavedSudoku && (
                    <Sudoku
                      level={selectedSavedSudoku}
                      size={35}
                      onCellSelect={handleCellSelect}
                      selectedCells={selectedCells}
                      highlightedNumber={highlightedNumber}
                      settings={settings}
                      isRunning={isRunning}
                      isSolved={isSolvedState}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    {selectedSavedSudoku && (
                      <SudokuControls
                        highlightedNumber={highlightedNumber}
                        settings={settings}
                        onNumberClick={handleNumberClick}
                        handleNoteClick={handleNoteClick}
                        handlePaletteClick={handlePaletteClick}
                        sudoku={selectedSavedSudoku}
                      />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </>
          )}
          {settings.BA === "left" && !isMobile && (
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
                    {selectedSavedSudoku && (
                      <SudokuControls
                        highlightedNumber={highlightedNumber}
                        settings={settings}
                        onNumberClick={handleNumberClick}
                        handleNoteClick={handleNoteClick}
                        handlePaletteClick={handlePaletteClick}
                        sudoku={selectedSavedSudoku}
                      />
                    )}
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
                      isSolved={isSolvedState}
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
