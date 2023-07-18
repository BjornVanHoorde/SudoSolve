// INFO
// ------------------------------------------------------------------------------------------------

import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";

// IMPORTS
// ------------------------------------------------------------------------------------------------

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function PreviewLevel({ level, size = 28 }) {
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
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          border: "2px solid",
          borderColor: theme.palette.primary.darker,
          borderRadius: 1,
          mb: 3,
          display: "inline-block",
        }}
      >
        {Object.entries(level.board)
          .sort(
            ([rowA], [rowB]) =>
              parseInt(rowA.substring(1)) - parseInt(rowB.substring(1))
          )
          .map(([row]) => (
            <Box key={row} sx={{ height: size }}>
              {Object.keys(level.board[row])
                .sort(
                  (colA, colB) =>
                    parseInt(colA.substring(1)) - parseInt(colB.substring(1))
                )
                .map((col) => (
                  <Box
                    key={`${row}-${col}`}
                    sx={{
                      display: "inline-block",
                      width: size,
                      height: size,
                      border: "1px solid",
                      borderColor: theme.palette.primary.lighter,
                      borderRight:
                        col.substring(1) === "3" || col.substring(1) === "6"
                          ? `2px solid ${theme.palette.primary.darker}`
                          : `1px solid ${theme.palette.primary.lighter}`,
                      borderBottom:
                        row.substring(1) === "3" || row.substring(1) === "6"
                          ? `2px solid ${theme.palette.primary.darker}`
                          : `1px solid ${theme.palette.primary.lighter}`,
                      m: 0,
                    }}
                  >
                    <Typography
                      color={level.board[row][col].value ? "black" : "white"}
                      textAlign="center"
                      sx={{
                        fontSize: size / 2,
                        fontWeight: 600,
                        lineHeight: `${size}px`,
                        height: size,
                        width: size,
                        m: 0,
                      }}
                    >
                      {level.board[row][col].value}
                    </Typography>
                  </Box>
                ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
}
