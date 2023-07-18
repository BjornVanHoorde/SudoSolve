// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import { Button, Card, Container, Dialog, Grid, Slide } from "@mui/material";
import Head from "next/head";
import { forwardRef, useContext, useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "src/components/settings";
import { fb_create_userSudoku } from "src/firebase/apis/userSudokus";
import { dataContext } from "src/firebase/dataProvider";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "src/routes/paths";
import LevelCard from "src/sections/play/LevelCard";
import LevelGrid from "src/sections/play/LevelGrid";
import { isMobileContext } from "src/utils/isMobileProvider";
import { testSudoku } from "src/utils/testSudoku";
import { date } from "yup";

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

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSavedLevel, setSelectedSavedLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [sorterdSudokus, setSorterdSudokus] = useState([]);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleLevelClick = (level) => {
    setSelectedLevel(level);

    setSelectedSavedLevel(
      savedSudokus.find((sudoku) => sudoku.sudokuId === level.level.sudokuId)
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

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    // order the userSudokus by date
    if (!userSudokus) return;
    setSorterdSudokus(
      userSudokus.sort((a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      })
    );
  }, [userSudokus]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>SudoSolve | My Sudokus</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading="My Sudokus"
          links={[
            { name: "Levels", href: PATH_DASHBOARD.play.root },
            { name: "My Sudokus" },
          ]}
        />

        {/* <Button variant="contained" onClick={handleSeed}>
          Seed
        </Button> */}

        <Grid container spacing={2}>
          {sorterdSudokus && sorterdSudokus.length > 0 && (
            <Grid item xs={12} md={8}>
              {isMobile ? (
                <LevelGrid
                  levels={sorterdSudokus}
                  onClick={handleLevelClick}
                  selectedLevel={selectedLevel}
                />
              ) : (
                <Card sx={{ p: 2 }}>
                  <LevelGrid
                    levels={sorterdSudokus}
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
