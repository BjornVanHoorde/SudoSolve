// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Card, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import SvgColor from "src/components/svg-color/SvgColor";
import { PATH_DASHBOARD } from "src/routes/paths";
import { difficulties } from "src/utils/constants";
import { isMobileContext } from "src/utils/isMobileProvider";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
export default function Difficulties({ onClick, selectedDifficulty }) {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { isMobile } = useContext(isMobileContext);
  const { push } = useRouter();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [hoveredDifficulty, setHoveredDifficulty] = useState(null);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleClick = (difficulty) => {
    if (onClick) {
      onClick(difficulty);
    } else {
      push(PATH_DASHBOARD.play.difficulty(difficulty.name.toLowerCase()));
    }
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      justifyContent="space-between"
    >
      {difficulties.array.map((difficulty, index) => (
        <Card
          key={index}
          sx={{
            p: 2,
            color:
              selectedDifficulty === difficulty ? difficulty.textColor : "",
            backgroundColor:
              selectedDifficulty === difficulty ? difficulty.color : "",
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
          onClick={() => handleClick(difficulty)}
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
                hoveredDifficulty === difficulty ||
                selectedDifficulty === difficulty
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
