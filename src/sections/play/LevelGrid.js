// INFO
// ------------------------------------------------------------------------------------------------

import { Card, Grid, Typography } from "@mui/material";
import { PRIMARY, SECONDARY, SUCCESS } from "src/theme/palette";

// IMPORTS
// ------------------------------------------------------------------------------------------------

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function LevelGrid({
  levels,
  difficulty,
  onClick,
  selectedLevel,
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
    <Grid container spacing={3}>
      {levels.map((level, index) => (
        <Grid item xs={2} key={index}>
          <Card
            sx={{
              width: 50,
              height: 50,
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `linear-gradient(to left, ${
                selectedLevel?.level?.sudokuId === level.sudokuId
                  ? SECONDARY.main
                  : PRIMARY.light
              }, ${
                selectedLevel?.level?.sudokuId === level.sudokuId
                  ? SECONDARY.light
                  : PRIMARY.lighter
              })`,
              color: "#141414",
              "&:hover": {
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
              },
            }}
            onClick={() => onClick({ level: level, index: index + 1 })}
          >
            <Typography variant="h6">{index + 1}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
