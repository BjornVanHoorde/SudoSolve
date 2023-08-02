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
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { forwardRef, useContext, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "src/components/settings";
import { fb_create_userSudoku } from "src/firebase/apis/userSudokus";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "src/routes/paths";
import Difficulties from "src/sections/play/Difficulties";
import PreviewLevel from "src/sections/play/PreviewLevel";
import { PRIMARY } from "src/theme/palette";
import { isMobileContext } from "src/utils/isMobileProvider";
import { transformGenerateSudoku } from "src/utils/transformGenratedSudoku";
import { useSnackbar } from "src/components/snackbar";
import Iconify from "src/components/iconify/Iconify";
import { loaderAnimation2 } from "src/utils/loaderAnimation2";
import Lottie from "lottie-react";
import { loaderAnimation } from "src/utils/loaderAnimation";

// GLOBALS
// ------------------------------------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// EXPORT
// ------------------------------------------------------------------------------------------------
playGenerateScreen.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function playGenerateScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { isMobile } = useContext(isMobileContext);
  const { enqueueSnackbar } = useSnackbar();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [difficulty, setDifficulty] = useState();
  const [sudoku, setSudoku] = useState();
  const [open, setOpen] = useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------

  const handleClick = (difficulty) => {
    if (isMobile) {
      setOpen(true);
    }
    setDifficulty(difficulty);
    try {
      fetch(
        "https://europe-west1-project-bjorn.cloudfunctions.net/GenerateSudoku",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            difficulty: difficulty.name,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const transformedSudoku = transformGenerateSudoku(
            data.sudoku,
            data.solvedSudoku
          );
          setSudoku({ board: transformedSudoku });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    fb_create_userSudoku({
      userId: user.userId,
      difficulty: difficulty.name.toLowerCase(),
      type: "generated",
      board: sudoku.board,
    }).then(() => {
      enqueueSnackbar("Sudoku saved", { variant: "success" });
      setSudoku(null);
      setDifficulty(null);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSudoku(null);
    setDifficulty(null);
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------1
  return (
    <>
      <Head>
        <title>SudoSolve | Generate</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading="Generate Sudoku"
          links={[
            { name: "Levels", href: PATH_DASHBOARD.play.root },
            { name: "Generate Sudoku" },
          ]}
        />

        <Difficulties onClick={handleClick} selectedDifficulty={difficulty} />

        {difficulty && !isMobile && (
          <Card sx={{ p: 5, mt: 3 }}>
            <Grid container spacing={3}>
              {!sudoku && (
                <Lottie
                  animationData={loaderAnimation2}
                  style={{
                    width: 75,
                    height: 75,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              {sudoku && (
                <>
                  <Grid item xs={8}>
                    <PreviewLevel level={sudoku} size={40} />
                  </Grid>
                  <Grid item xs={4}>
                    <Stack
                      spacing={2}
                      justifyContent="end"
                      sx={{ height: "100%", pb: 3 }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: PRIMARY.main,
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: PRIMARY.dark,
                            boxShadow: "none",
                          },
                        }}
                      >
                        Play
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: PRIMARY.main,
                          color: PRIMARY.main,
                          "&:hover": {
                            backgroundColor: PRIMARY.lighter,
                            borderColor: PRIMARY.light,
                          },
                        }}
                        onClick={handleSave}
                      >
                        Save for later
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: PRIMARY.main,
                          color: PRIMARY.main,
                          "&:hover": {
                            backgroundColor: PRIMARY.lighter,
                            borderColor: PRIMARY.light,
                          },
                        }}
                        onClick={() => handleClick(difficulty)}
                      >
                        Generate again
                      </Button>
                    </Stack>
                  </Grid>
                </>
              )}
            </Grid>
          </Card>
        )}

        {difficulty && isMobile && (
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <Card sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h5">{difficulty.name}</Typography>
                <IconButton
                  onClick={handleClose}
                  color="error"
                  sx={{ ml: "auto" }}
                >
                  <Iconify icon="mdi:close" />
                </IconButton>
              </Stack>

              <Grid container spacing={3}>
                {!sudoku && (
                  <Lottie animation={loaderAnimation2} height={200} />
                )}
                {sudoku && (
                  <>
                    <Grid item xs={12} md={6}>
                      <PreviewLevel level={sudoku} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack
                        spacing={2}
                        justifyContent="end"
                        sx={{ height: "100%", pb: 3 }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: PRIMARY.main,
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: PRIMARY.dark,
                              boxShadow: "none",
                            },
                          }}
                        >
                          Play
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: PRIMARY.main,
                            color: PRIMARY.main,
                            "&:hover": {
                              backgroundColor: PRIMARY.lighter,
                              borderColor: PRIMARY.light,
                            },
                          }}
                          onClick={handleSave}
                        >
                          Save for later
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: PRIMARY.main,
                            color: PRIMARY.main,
                            "&:hover": {
                              backgroundColor: PRIMARY.lighter,
                              borderColor: PRIMARY.light,
                            },
                          }}
                          onClick={() => handleClick(difficulty)}
                        >
                          Generate again
                        </Button>
                      </Stack>
                    </Grid>
                  </>
                )}
              </Grid>
            </Card>
          </Dialog>
        )}
      </Container>
    </>
  );
}
