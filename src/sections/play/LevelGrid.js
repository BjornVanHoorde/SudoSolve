// INFO
// ------------------------------------------------------------------------------------------------

import { useTheme } from "@emotion/react";
import { Card, Grid, Typography } from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import { PRIMARY, SECONDARY, SUCCESS } from "src/theme/palette";
import { checkIfSolved } from "src/utils/isSolved";

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
  savedLevels,
}) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const theme = useTheme();

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
    <Grid container spacing={3} justifyContent="start" alignItems="center">
      {levels
        .sort((a, b) => a.dateCreated - b.dateCreated)
        .map((level, index) => (
          <Grid
            item
            key={index}
            sx={{
              position: "relative",
            }}
          >
            <Iconify
              icon="mdi:check-bold"
              sx={{
                position: "absolute",
                top: 20,
                right: -5,
                color: "darkgreen",
                display: checkIfSolved(level, savedLevels) ? "block" : "none",
                zIndex: 1,
              }}
            />
            <Card
              sx={{
                width: 45,
                height: 45,
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `linear-gradient(to left, ${
                  checkIfSolved(level, savedLevels)
                    ? theme.palette.success.main
                    : selectedLevel?.level?.sudokuId === level.sudokuId
                    ? SECONDARY.main
                    : PRIMARY.light
                }, ${
                  checkIfSolved(level, savedLevels)
                    ? theme.palette.success.light
                    : selectedLevel?.level?.sudokuId === level.sudokuId
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
