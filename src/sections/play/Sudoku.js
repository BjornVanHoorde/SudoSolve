// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function Sudoku({
  level,
  size = 25,
  onCellSelect,
  selectedCells,
}) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const theme = useTheme();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [isMouseDown, setIsMouseDown] = useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleCellClick = (row, col) => {
    if (!isMouseDown) {
      onCellSelect(row, col);
    }
  };

  const handleCellMouseEnter = (row, col) => {
    if (isMouseDown) {
      onCellSelect(row, col, true);
    }
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <Box sx={{ textAlign: "center", userSelect: "none" }}>
      <Box
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
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
                      cursor: "pointer",
                      backgroundColor: selectedCells.some(
                        (cell) => cell.row === row && cell.col === col
                      )
                        ? theme.palette.primary.lightest
                        : "transparent",
                    }}
                    onClick={() => {
                      handleCellClick(row, col);
                    }}
                    onMouseEnter={() => {
                      handleCellMouseEnter(row, col);
                    }}
                  >
                    <Typography
                      color={
                        selectedCells.some(
                          (cell) => cell.row === row && cell.col === col
                        ) && !level.board[row][col].value
                          ? theme.palette.primary.lightest
                          : level.board[row][col].value
                          ? "black"
                          : "white"
                      }
                      textAlign="center"
                      sx={{
                        fontSize: size / 2,
                        fontWeight: level.board[row][col].isGiven ? 700 : 300,
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
