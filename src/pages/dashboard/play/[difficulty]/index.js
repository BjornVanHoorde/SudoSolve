// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import {
  Card,
  Container,
  Dialog,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import { forwardRef, useContext, useEffect, useState } from "react";
import { isMobileContext } from "src/utils/isMobileProvider";
import { useRouter } from "next/router";
import { difficulties } from "src/utils/constants";
import SvgColor from "src/components/svg-color/SvgColor";
import LevelGrid from "src/sections/play/LevelGrid";
import { fb_create_sudoku } from "src/firebase/apis/sudokus";
import { testSudoku } from "src/utils/testSudoku";
import { dataContext } from "src/firebase/dataProvider";
import LevelCard from "src/sections/play/LevelCard";

// GLOBALS
// ------------------------------------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// EXPORT
// ------------------------------------------------------------------------------------------------
DifficultyScreen.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function DifficultyScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { isMobile } = useContext(isMobileContext);
  const { difficulty } = useRouter().query;
  const { sudokus, savedSudokus } = useContext(dataContext);

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [savedDifficultyLevels, setSavedDifficultyLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSavedLevel, setSelectedSavedLevel] = useState(null);
  const [open, setOpen] = useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleSeed = () => {
    fb_create_sudoku({
      ...testSudoku,
      difficulty: difficulty,
    });
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);

    setSelectedSavedLevel(
      savedDifficultyLevels.find(
        (sudoku) => sudoku.originalSudokuId === level.level.sudokuId
      )
    );

    setOpen(true);
  };

  const handleLevelClose = () => {
    setSelectedLevel(null);
    setSelectedSavedLevel(null);
    setOpen(false);
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (sudokus) {
      setDifficultyLevels(
        sudokus.filter((sudoku) => sudoku.difficulty === difficulty)
      );
    }
  }, [sudokus]);

  useEffect(() => {
    if (savedSudokus) {
      setSavedDifficultyLevels(
        savedSudokus.filter(
          (sudoku) =>
            sudoku.difficulty === difficulty && sudoku.userId === user.userId
        ) || []
      );
    }
  }, [savedSudokus]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>{`SudoSolve | ${
          difficulty ? difficulties[difficulty].name : ""
        }`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          icon={
            <SvgColor
              src={difficulty ? difficulties[difficulty].icon : ""}
              alt={difficulty ? difficulties[difficulty].name : ""}
              color={difficulty ? difficulties[difficulty].color : ""}
            />
          }
          heading={difficulty ? difficulties[difficulty].name : ""}
          links={[
            { name: "Levels", href: PATH_DASHBOARD.play.root },
            { name: difficulty ? difficulties[difficulty].name : "" },
          ]}
        />
        {/* 
        <Button variant="contained" onClick={handleSeed}>
          Seed
        </Button> */}
        {difficultyLevels?.length === 0 && (
          <Typography variant="h4" align="center">
            🔍️ No levels found
          </Typography>
        )}
        <Grid container spacing={2}>
          {difficultyLevels && difficultyLevels.length > 0 && (
            <Grid item xs={12} md={8}>
              {isMobile ? (
                <LevelGrid
                  levels={difficultyLevels}
                  difficulty={difficulties[difficulty]}
                  onClick={handleLevelClick}
                  selectedLevel={selectedLevel}
                />
              ) : (
                <Card sx={{ p: 2 }}>
                  <LevelGrid
                    levels={difficultyLevels}
                    difficulty={difficulties[difficulty]}
                    onClick={handleLevelClick}
                    selectedLevel={selectedLevel}
                  />
                </Card>
              )}
            </Grid>
          )}
          {selectedLevel && !isMobile && (
            <LevelCard
              onLevelClose={handleLevelClose}
              selectedLevel={selectedLevel}
              selectedSavedLevel={selectedSavedLevel}
            />
          )}
          {selectedLevel && isMobile && (
            <Dialog
              open={open}
              onClose={handleLevelClose}
              TransitionComponent={Transition}
            >
              <LevelCard
                onLevelClose={handleLevelClose}
                selectedLevel={selectedLevel}
                selectedSavedLevel={selectedSavedLevel}
              />
            </Dialog>
          )}
        </Grid>
      </Container>
    </>
  );
}
