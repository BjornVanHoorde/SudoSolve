// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createSudoku } from "src/utils/createSudoku";
import { useSnackbar } from "src/components/snackbar";
import { useEffect, useState } from "react";
import PreviewLevel from "../play/PreviewLevel";
import { fb_create_sudoku } from "src/firebase/apis/sudokus";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function CreateSudoku() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { enqueueSnackbar } = useSnackbar();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [sudokuString, setSudokuString] = useState("");
  const [sudokuData, setSudokuData] = useState(null);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleSudokuCreate = async () => {
    const string = sudokuString.replaceAll(" ", "");
    if (string.length !== 81) {
      enqueueSnackbar("Sudoku string is not valid", {
        variant: "error",
      });
      return;
    }
    const sudokuData = await createSudoku(string);
    setSudokuData(sudokuData);
  };

  const handleSave = () => {
    fb_create_sudoku({
      difficulty: sudokuData.difficulty,
      board: sudokuData.sudoku,
    })
      .then(() => {
        enqueueSnackbar(
          `Sudoku created for difficulty ${sudokuData.difficulty}`,
          {
            variant: "success",
          }
        );
        setSudokuData(null);
        setSudokuString("");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <Card sx={{ p: 2 }}>
      <TextField
        label="Sudoku string"
        fullWidth
        onChange={(e) => setSudokuString(e.target.value)}
      />
      <Stack direction="row" justifyContent="end" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSudokuCreate}>
          Create
        </Button>
      </Stack>
      {sudokuData && (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{ mb: 2 }}
                variant="h6"
              >{`Empty cells: ${sudokuData.emptyCells}`}</Typography>
              <PreviewLevel level={{ board: sudokuData.sudoku }} size={40} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{ mb: 2 }}
                variant="h6"
              >{`Difficulty: ${sudokuData.difficulty}`}</Typography>
              <PreviewLevel
                level={{ board: sudokuData.solvedSudoku }}
                size={40}
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="end">
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
}
