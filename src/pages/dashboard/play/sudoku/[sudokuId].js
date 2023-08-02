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

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if ((sudokuId, sudokus, savedSudokus)) {
      const sudoku = sudokus.find((s) => s.sudokuId === sudokuId);
      const savedSudoku = savedSudokus.find(
        (s) => s.originalSudokuId === sudokuId
      );

      if (sudoku) {
        setSelectedSudoku(sudoku);
      }
      if (savedSudoku) {
        setSelectedSavedSudoku(savedSudoku);
      }
    }
  }, [sudokuId, sudokus, savedSudokus]);

  useEffect(() => {
    if (user && users.length > 0) {
      const currentUser = users.find((u) => u.userId === user.userId);
      setSettings(currentUser.settings);
    }
  }, [user, users]);

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
                  {selectedSudoku && (
                    <Sudoku
                      level={selectedSudoku}
                      size={55}
                      onCellSelect={handleCellSelect}
                      selectedCells={selectedCells}
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
                    <SudokuControls />
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
                    <SudokuControls />
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Card sx={{ p: 2 }}>
                  {selectedSudoku && (
                    <Sudoku
                      level={selectedSudoku}
                      size={55}
                      onCellSelect={handleCellSelect}
                      selectedCells={selectedCells}
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
