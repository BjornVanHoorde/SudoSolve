// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Card, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import SvgColor from "src/components/svg-color/SvgColor";
import { difficulties } from "src/utils/constants";
import { isMobileContext } from "src/utils/isMobileProvider";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function Difficulties() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { isMobile } = useContext(isMobileContext);

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [hoveredDifficulty, setHoveredDifficulty] = useState(null);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      justifyContent="space-evenly"
    >
      {difficulties.array.map((difficulty, index) => (
        <Card
          key={index}
          sx={{
            p: 2,
            "&:hover": {
              cursor: "pointer",
              backgroundColor: difficulty.color,
              color: difficulty.textColor,
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            },
            boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
          }}
          onMouseEnter={() => setHoveredDifficulty(difficulty)}
          onMouseLeave={() => setHoveredDifficulty(null)}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <SvgColor
              src={difficulty.icon}
              color={
                hoveredDifficulty === difficulty
                  ? difficulty.textColor
                  : "#000000"
              }
              width={32}
              height={32}
            />
            <Typography width={isMobile ? "100%" : "auto"} variant="h6">
              {difficulty.name}
            </Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
