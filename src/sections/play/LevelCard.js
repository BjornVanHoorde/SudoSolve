// INFO
// ------------------------------------------------------------------------------------------------

import {
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import { difficulties } from "src/utils/constants";
import PreviewLevel from "./PreviewLevel";
import { PRIMARY } from "src/theme/palette";
import { fb_delete_userSudoku } from "src/firebase/apis/userSudokus";
import { useSnackbar } from "src/components/snackbar";
import { useState } from "react";
import ConfirmDialog from "src/components/confirm-dialog/ConfirmDialog";
import { fb_delete_savedSudoku } from "src/firebase/apis/savedSudokus";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "src/routes/paths";

// IMPORTS
// ------------------------------------------------------------------------------------------------

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function LevelCard({
  onLevelClose,
  selectedLevel,
  selectedSavedLevel,
  isUserSudoku = false,
}) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleDelete = async () => {
    if (selectedSavedLevel) {
      fb_delete_savedSudoku(selectedSavedLevel.sudokuId);
    }
    await fb_delete_userSudoku(selectedLevel.level.sudokuId)
      .then(() => {
        onLevelClose();
        enqueueSnackbar("Sudoku deleted", { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error deleting sudoku", { variant: "error" });
      });
  };

  const onLevelStartContinue = () => {
    if (selectedLevel) {
      push(PATH_DASHBOARD.play.sudoku(selectedLevel.level.sudokuId));
    }
  };

  const handleRestart = () => {
    if (selectedSavedLevel) {
      fb_delete_savedSudoku(selectedSavedLevel.sudokuId)
        .then(() => {
          push(PATH_DASHBOARD.play.sudoku(selectedLevel.level.sudokuId));
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Error Restarting sudoku", { variant: "error" });
        });
    } else {
      push(PATH_DASHBOARD.play.sudoku(selectedLevel.level.sudokuId));
    }
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="end">
            <IconButton
              onClick={onLevelClose}
              color="error"
              sx={{ ml: "auto" }}
            >
              <Iconify icon="mdi:close" />
            </IconButton>
          </Stack>
          <Typography textAlign="center" variant="h6" sx={{ mb: 2 }}>
            {selectedLevel.level.difficulty
              ? `${difficulties[selectedLevel.level.difficulty].name} - Level ${
                  selectedLevel.index
                }`
              : "My sudokus - Level " + selectedLevel.index}
          </Typography>

          <PreviewLevel level={selectedLevel.level} />

          <Typography align="center" variant="body1" sx={{ mb: 2 }}>
            {`Time: ${
              selectedSavedLevel?.time.seconds ||
              selectedSavedLevel?.time.minutes
                ? `${
                    selectedSavedLevel?.time.hours
                      ? selectedSavedLevel?.time.hours + ":"
                      : ""
                  }${
                    selectedSavedLevel?.time.minutes < 10
                      ? "0" + selectedSavedLevel?.time.minutes
                      : selectedSavedLevel?.time.minutes
                  }:${
                    selectedSavedLevel?.time.seconds < 10
                      ? "0" + selectedSavedLevel?.time.seconds
                      : selectedSavedLevel?.time.seconds
                  }`
                : "00:00"
            }`}
          </Typography>
          <Stack spacing={2}>
            <Button
              sx={{ backgroundColor: PRIMARY.main }}
              variant="contained"
              fullWidth
              onClick={onLevelStartContinue}
            >
              {selectedSavedLevel ? "Continue" : "Start"}
            </Button>
            {selectedSavedLevel && (
              <Button
                sx={{ backgroundColor: PRIMARY.main }}
                variant="contained"
                fullWidth
                onClick={handleRestart}
              >
                Restart
              </Button>
            )}
            {isUserSudoku && (
              <Button
                onClick={() => setOpen(true)}
                color="error"
                variant="contained"
                fullWidth
              >
                Delete
              </Button>
            )}
          </Stack>
        </Card>
      </Grid>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete sudoku"
        content="Are you sure you want to delete this sudoku?"
        action={
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        }
      />
    </>
  );
}
