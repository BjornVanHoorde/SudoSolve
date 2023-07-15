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
}) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------

  // STATES
  // ------------------------------------------------------------------------------------------------

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="end">
          <IconButton onClick={onLevelClose} sx={{ ml: "auto" }}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </Stack>
        <Typography textAlign="center" variant="h6" sx={{ mb: 2 }}>
          {`${difficulties[selectedLevel.level.difficulty].name} - Level ${
            selectedLevel.index
          }`}
        </Typography>

        <PreviewLevel level={selectedLevel.level} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {`Time: ${
            selectedSavedLevel?.time ? selectedSavedLevel.time : "00:00"
          }`}
        </Typography>
        <Button variant="contained" fullWidth>
          {selectedSavedLevel ? "Continue" : "Start"}
        </Button>
        {selectedSavedLevel && (
          <Button variant="contained" fullWidth>
            Restart
          </Button>
        )}
      </Card>
    </Grid>
  );
}
