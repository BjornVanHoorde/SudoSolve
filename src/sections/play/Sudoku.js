// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocales } from "src/locales";
import { isMobileContext } from "src/utils/isMobileProvider";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function Sudoku({
  level,
  size = 25,
  onCellSelect,
  selectedCells,
  highlightedNumber,
  settings,
  isRunning,
  isSolved,
}) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const theme = useTheme();
  const { isMobile } = useContext(isMobileContext);
  const { translate } = useLocales();

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

  const checkInBox = (row, col) => {
    if (selectedCells.length === 0) return false;
    const startRow =
      selectedCells[0].row.substring(1) -
      1 -
      ((selectedCells[0].row.substring(1) - 1) % 3) +
      1;
    const startCol =
      selectedCells[0].col.substring(1) -
      1 -
      ((selectedCells[0].col.substring(1) - 1) % 3) +
      1;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (
          i === parseInt(row.substring(1)) &&
          j === parseInt(col.substring(1))
        ) {
          return true;
        }
      }
    }
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      {!isRunning && !isMobile && !isSolved && (
        <>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {translate("paused").toUpperCase()}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {`${translate("noPeeking")} 🙈`}
          </Typography>
        </>
      )}
      {!isRunning && isMobile && !isSolved && (
        <Card sx={{ height: 35 * 10 - 8 }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {translate("paused").toUpperCase()}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {`${translate("noPeeking")} 🙈`}
          </Typography>
        </Card>
      )}
      <Box
        sx={{
          textAlign: "center",
          userSelect: "none",
          display: isRunning || isSolved ? "" : "none",
        }}
      >
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
                        position: "relative",
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
                        backgroundColor:
                          level.board[row][col].value !== 0 &&
                          level.board[row][col].value !==
                            level.board[row][col].correctValue &&
                          settings.HE
                            ? "red"
                            : selectedCells.some(
                                (cell) => cell.row === row && cell.col === col
                              )
                            ? theme.palette.primary.lightest
                            : highlightedNumber ===
                                level.board[row][col].value &&
                              highlightedNumber !== 0 &&
                              settings.HMN
                            ? theme.palette.primary.lightest
                            : selectedCells.length === 1 &&
                              (row === selectedCells[0].row ||
                                col === selectedCells[0].col ||
                                checkInBox(row, col)) &&
                              settings.HRC
                            ? theme.palette.primary.lightestest
                            : level.board[row][col].color
                            ? level.board[row][col].color
                            : "transparent",
                      }}
                      onClick={() => {
                        handleCellClick(row, col);
                      }}
                      onMouseEnter={() => {
                        handleCellMouseEnter(row, col);
                      }}
                    >
                      {!level.board[row][col].value && (
                        <Grid
                          container
                          sx={{
                            position: "absolute",
                            top: 0,
                            p: 0,
                            m: 0,
                          }}
                        >
                          {Array.from({ length: 9 }, (_, i) => i + 1).map(
                            (note, index) => (
                              <Grid
                                item
                                key={index}
                                xs={4}
                                sx={{
                                  mb: -0.35,
                                  mt: -0.35,
                                  backgroundColor:
                                    highlightedNumber === note &&
                                    highlightedNumber !== 0 &&
                                    level.board[row][col].notes.includes(
                                      note
                                    ) &&
                                    settings.HMN
                                      ? theme.palette.primary.lightest
                                      : " ",
                                  fontWeight:
                                    highlightedNumber === note &&
                                    highlightedNumber !== 0 &&
                                    level.board[row][col].notes.includes(
                                      note
                                    ) &&
                                    settings.HMN
                                      ? 900
                                      : " ",
                                }}
                              >
                                <Typography
                                  color={
                                    !level.board[row][col].notes.includes(note)
                                      ? "transparent"
                                      : ""
                                  }
                                  sx={{}}
                                  variant="notes"
                                >
                                  {level.board[row][col].notes.includes(note)
                                    ? note
                                    : 0}
                                </Typography>
                              </Grid>
                            )
                          )}
                        </Grid>
                      )}
                      <Typography
                        color={
                          selectedCells.some(
                            (cell) => cell.row === row && cell.col === col
                          ) && !level.board[row][col].value
                            ? theme.palette.primary.lightest
                            : selectedCells.length === 1 &&
                              (row === selectedCells[0].row ||
                                col === selectedCells[0].col ||
                                checkInBox(row, col)) &&
                              !level.board[row][col].value &&
                              settings.HRC
                            ? theme.palette.primary.lightestest
                            : level.board[row][col].color &&
                              !level.board[row][col].value
                            ? level.board[row][col].color
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
    </>
  );
}
