// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import {
  Button,
  Card,
  Container,
  Dialog,
  Grid,
  MenuItem,
  Select,
  Slide,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { forwardRef, useContext, useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "src/components/settings";
import { fb_create_userSudoku } from "src/firebase/apis/userSudokus";
import { dataContext } from "src/firebase/dataProvider";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useLocales } from "src/locales";
import { PATH_DASHBOARD } from "src/routes/paths";
import Difficulties from "src/sections/play/Difficulties";
import LevelCard from "src/sections/play/LevelCard";
import LevelGrid from "src/sections/play/LevelGrid";
import { difficulties } from "src/utils/constants";
import { isMobileContext } from "src/utils/isMobileProvider";
import { testSudoku } from "src/utils/testSudoku";

// GLOBALS
// ------------------------------------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// EXPORT
// ------------------------------------------------------------------------------------------------
PlayMySudokusScreen.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function PlayMySudokusScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { isMobile } = useContext(isMobileContext);
  const { userSudokus, savedSudokus } = useContext(dataContext);
  const { translate } = useLocales();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSavedLevel, setSelectedSavedLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [sortedSudokus, setSortedSudokus] = useState([]);
  const [difficulty, setDifficulty] = useState({
    name: "all",
  });

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleLevelClick = (level) => {
    setSelectedLevel(level);

    setSelectedSavedLevel(
      savedSudokus.find(
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

  const handleSeed = () => {
    fb_create_userSudoku({
      ...testSudoku,
      type: "generated",
    });
  };

  const handleDifficultyClick = (clickedDifficulty) => {
    if (difficulty === clickedDifficulty) {
      setDifficulty(null);
      setSelectedLevel(null);
      return;
    }

    if (clickedDifficulty === undefined) {
      setDifficulty({ name: "all" });
      setSelectedLevel(null);
      return;
    } else {
      setDifficulty(clickedDifficulty);
      setSelectedLevel(null);
    }
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    // order the userSudokus by date
    if (!userSudokus) return;
    let newArray = userSudokus.sort((a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    });

    // filter by difficulty
    if (difficulty.name !== "all") {
      newArray = newArray.filter(
        (sudoku) => sudoku.difficulty === difficulty.name.toLowerCase()
      );
    }

    setSortedSudokus(newArray);
  }, [userSudokus, difficulty]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>{`SudoSolve | ${translate("my")} Sudokus`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading={`${translate("my")} Sudokus`}
          links={[
            { name: translate("levels"), href: PATH_DASHBOARD.play.root },
            { name: `${translate("my")} Sudokus` },
          ]}
        />

        {/* <Button variant="contained" onClick={handleSeed}>
          Seed
        </Button> */}

        {!isMobile && (
          <Difficulties
            onClick={handleDifficultyClick}
            selectedDifficulty={difficulty}
          />
        )}
        {isMobile && (
          <Select
            fullWidth
            value={difficulty ? difficulty.name : ""}
            label={translate("difficulty")}
            onChange={(e) => {
              const difficulty = difficulties.array.find(
                (difficulty) => difficulty.name === e.target.value
              );
              handleDifficultyClick(difficulty);
            }}
          >
            <MenuItem value="all">{translate("all")}</MenuItem>
            {difficulties.array.map((difficulty) => (
              <MenuItem key={difficulty.name} value={difficulty.name}>
                {translate(difficulty.name)}
              </MenuItem>
            ))}
          </Select>
        )}

        {sortedSudokus?.length === 0 && (
          <Typography
            sx={{
              mt: 5,
            }}
            variant="h4"
            align="center"
          >
            {`🔍️ ${translate("noLevelsFound")}`}
          </Typography>
        )}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {sortedSudokus && sortedSudokus.length > 0 && (
            <Grid item xs={12} md={8}>
              {isMobile ? (
                <LevelGrid
                  levels={sortedSudokus}
                  onClick={handleLevelClick}
                  selectedLevel={selectedLevel}
                  savedLevels={savedSudokus}
                />
              ) : (
                <Card sx={{ p: 2 }}>
                  <LevelGrid
                    levels={sortedSudokus}
                    onClick={handleLevelClick}
                    selectedLevel={selectedLevel}
                    savedLevels={savedSudokus}
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
              isUserSudoku={true}
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
                isUserSudoku={true}
              />
            </Dialog>
          )}
        </Grid>
      </Container>
    </>
  );
}
