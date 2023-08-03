// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/iconify/Iconify";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function SudokuControls({
  highlightedNumber,
  onNumberClick,
  settings,
  handleNoteClick,
}) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const theme = useTheme();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState("number");

  // VARIABLES
  // ------------------------------------------------------------------------------------------------
  const buttonStyle = {
    border: "2px solid",
    borderColor: theme.palette.primary.light,
    color: "#282828",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      boxShadow: `1px 1px 5px ${theme.palette.primary.main}`,
    },
    transition: "all 0.2s ease-in-out",
    userSelect: "none",
  };

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        {selectedTab === "number" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 1 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(1)}
              >
                <Typography variant="h3">1</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 2 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(2)}
              >
                <Typography variant="h3">2</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 3 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(3)}
              >
                <Typography variant="h3">3</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === "notes" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "start",
                  alignItems: "start",
                  pl: 0.5,
                  backgroundColor:
                    highlightedNumber === 1 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(1)}
              >
                <Typography variant="h3alt">1</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "center",
                  alignItems: "start",
                  backgroundColor:
                    highlightedNumber === 2 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(2)}
              >
                <Typography variant="h3alt">2</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "end",
                  alignItems: "start",
                  pr: 0.5,
                  backgroundColor:
                    highlightedNumber === 3 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(3)}
              >
                <Typography variant="h3alt">3</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === "palette" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                }}
              ></Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(0, 0, 255, 0.5)",
                }}
              ></Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(0, 255, 0, 0.5)",
                }}
              ></Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            ...buttonStyle,
            mb: 1,
            height: "auto",
            backgroundColor:
              selectedTab === "number"
                ? theme.palette.primary.lighter
                : "transparent",
          }}
          onClick={() => setSelectedTab("number")}
        >
          <Typography variant="h2">1</Typography>
        </Box>
      </Grid>
      <Grid item xs={9}>
        {selectedTab === "number" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 4 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(4)}
              >
                <Typography variant="h3">4</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 5 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(5)}
              >
                <Typography variant="h3">5</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 6 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(6)}
              >
                <Typography variant="h3">6</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === "notes" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "start",
                  alignItems: "center",
                  pl: 0.5,
                  backgroundColor:
                    highlightedNumber === 4 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(4)}
              >
                <Typography variant="h3alt">4</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    highlightedNumber === 5 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(5)}
              >
                <Typography variant="h3alt">5</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "end",
                  alignItems: "center",
                  pr: 0.5,
                  backgroundColor:
                    highlightedNumber === 6 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(6)}
              >
                <Typography variant="h3alt">6</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === "palette" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(255, 255, 0, 0.5)",
                }}
              ></Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                }}
              ></Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(128, 0, 128, 0.5)",
                }}
              ></Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            ...buttonStyle,
            mb: 1,
            height: "auto",
            backgroundColor:
              selectedTab === "notes"
                ? theme.palette.primary.lighter
                : "transparent",
          }}
          onClick={() => setSelectedTab("notes")}
        >
          <Grid container>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography color="white" variant="caption">
                1
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography color="white" variant="caption">
                2
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography color="white" variant="caption">
                3
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography variant="caption">4</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography color="white" variant="caption">
                5
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography variant="caption">6</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography color="white" variant="caption">
                7
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography color="white" variant="caption">
                8
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ mb: -0.15, mt: -0.15 }}>
              <Typography variant="caption">9</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={9}>
        {selectedTab === "number" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 7 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(7)}
              >
                <Typography variant="h3">7</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 8 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(8)}
              >
                <Typography variant="h3">8</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor:
                    highlightedNumber === 9 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => onNumberClick(9)}
              >
                <Typography variant="h3">9</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === "notes" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "start",
                  alignItems: "end",
                  pl: 0.5,
                  backgroundColor:
                    highlightedNumber === 7 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(7)}
              >
                <Typography variant="h3alt">7</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "center",
                  alignItems: "end",
                  backgroundColor:
                    highlightedNumber === 8 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(8)}
              >
                <Typography variant="h3alt">8</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  justifyContent: "end",
                  alignItems: "end",
                  pr: 0.5,
                  backgroundColor:
                    highlightedNumber === 9 && settings.HMN
                      ? theme.palette.primary.lightest
                      : "transparent",
                }}
                onClick={() => handleNoteClick(9)}
              >
                <Typography variant="h3alt">9</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
        {selectedTab === "palette" && (
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(255, 192, 203, 0.5)",
                }}
              ></Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(165, 42, 42, 0.5)",
                }}
              ></Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  ...buttonStyle,
                  backgroundColor: "rgba(0, 255, 255, 0.5)",
                }}
              ></Box>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            ...buttonStyle,
            height: "auto",
            maxHeight: 70,
            mb: 1,
            backgroundColor:
              selectedTab === "palette"
                ? theme.palette.primary.lighter
                : "transparent",
          }}
          onClick={() => setSelectedTab("palette")}
        >
          <Iconify icon="mdi:palette" width="90%" sx={{ maxWidth: 70 }} />
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={4}>
            <Box sx={buttonStyle}>
              <Iconify
                icon="mdi:arrow-u-left-top"
                width="90%"
                sx={{ maxWidth: 70 }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={buttonStyle}>
              <Iconify
                icon="mdi:arrow-u-right-top"
                width="90%"
                sx={{ maxWidth: 70 }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={buttonStyle}
              onClick={() => {
                selectedTab === "number"
                  ? onNumberClick(0)
                  : selectedTab === "notes"
                  ? handleNoteClick(0)
                  : null;
              }}
            >
              <Iconify
                icon="mdi:window-close"
                width="90%"
                sx={{ maxWidth: 70 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            ...buttonStyle,
          }}
        >
          <Iconify
            icon="mdi:lightbulb-variant-outline"
            width="90%"
            sx={{ maxWidth: 70 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
