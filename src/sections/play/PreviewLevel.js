// INFO
// ------------------------------------------------------------------------------------------------

import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

// IMPORTS
// ------------------------------------------------------------------------------------------------

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function PreviewLevel({ level }) {
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
    <Box
      sx={{
        width: 255.5,
        margin: "0 auto",
        border: "2px solid black",
        mb: 3,
      }}
    >
      {Object.entries(level.board)
        .sort(
          ([rowA], [rowB]) =>
            parseInt(rowA.substring(1)) - parseInt(rowB.substring(1))
        )
        .map(([row]) => (
          <Box key={row} sx={{ height: 28 }}>
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
                    width: 28,
                    height: 28,
                    border: "1px solid grey",
                    borderRight:
                      col.substring(1) === "3" || col.substring(1) === "6"
                        ? "2px solid black"
                        : "1px solid grey",
                    borderBottom:
                      row.substring(1) === "3" || row.substring(1) === "6"
                        ? "2px solid black"
                        : "1px solid grey",
                    m: 0,
                  }}
                >
                  <Typography
                    color={level.board[row][col].value ? "black" : "white"}
                    textAlign="center"
                  >
                    {level.board[row][col].value}
                  </Typography>
                </Box>
              ))}
          </Box>
        ))}
    </Box>
  );
}
