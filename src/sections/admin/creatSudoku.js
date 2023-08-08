// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import {
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "src/components/snackbar";
import { useEffect, useState } from "react";
import PreviewLevel from "../play/PreviewLevel";
import { fb_create_sudoku } from "src/firebase/apis/sudokus";
import { difficulties } from "src/utils/constants";
import Lottie from "lottie-react";
import { loaderAnimation2 } from "src/utils/loaderAnimation2";
import { loaderAnimation } from "src/utils/loaderAnimation";
import { createSudoku } from "src/utils/createSudoku";

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
  const [difficulty, setDifficulty] = useState("");
  const [sudokuData, setSudokuData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setSudokuData(null);
    setDifficulty("");
    const sudokuData = await createSudoku(string);
    setSudokuData(sudokuData);
    setDifficulty(sudokuData.difficulty);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);

  const handleSave = () => {
    fb_create_sudoku({
      difficulty: difficulty,
      board: sudokuData.sudoku,
    })
      .then(() => {
        enqueueSnackbar(`Sudoku created for difficulty ${difficulty}`, {
          variant: "success",
        });
        setSudokuData(null);
        setSudokuString("");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
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
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h6">Difficulty:</Typography>
                  <Select
                    size="small"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {difficulties.array.map((difficulty) => (
                      <MenuItem
                        key={difficulty.name.toLowerCase()}
                        value={difficulty.name.toLowerCase()}
                      >
                        {difficulty.name.toLowerCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
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
        {isLoading && (
          <Stack alignItems="center">
            <Lottie
              animationData={loaderAnimation2}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </Stack>
        )}
      </Card>
    </>
  );
}
