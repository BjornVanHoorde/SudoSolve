// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import {
  Alert,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { Upload } from "src/components/upload";
import { useContext, useState } from "react";
import { useSnackbar } from "src/components/snackbar";
import { PRIMARY } from "src/theme/palette";
import { fb_uploadPicture } from "src/firebase/apis/sudokus";
import Lottie from "lottie-react";
import { loaderAnimation } from "src/utils/loaderAnimation";
import { transformGenerateSudoku } from "src/utils/transformGenratedSudoku";
import PreviewLevel from "src/sections/play/PreviewLevel";
import { solveSudoku } from "src/utils/solveSudoku";
import { isMobileContext } from "src/utils/isMobileProvider";
import { fb_create_userSudoku } from "src/firebase/apis/userSudokus";
import { getDifficulty } from "src/utils/getDifficulty";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
ScanIndexScreen.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function ScanIndexScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const { isMobile } = useContext(isMobileContext);

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sudoku, setSudoku] = useState(null);
  const [solvedSudoku, setSolvedSudoku] = useState(null);
  const [alertClosed, setAlertClosed] = useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleDrop = (acceptedFiles) => {
    // check if file is image
    if (!acceptedFiles[0].type.startsWith("image/")) {
      enqueueSnackbar("File is not an image", { variant: "error" });
      return;
    }
    setFile(acceptedFiles[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSudoku(null);
    setSolvedSudoku(null);
  };

  const handleScan = async () => {
    setLoading(true);

    try {
      await fb_uploadPicture(user.userId, file, file.name).then(async (r) => {
        const imageRef = r.ref.fullPath;

        await fetch(
          "https://europe-west1-project-bjorn.cloudfunctions.net/sudoku",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageRef }),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then(async (data) => {
            const unsolvedSudoku = data.sudoku;
            await fetch(
              "https://europe-west1-project-bjorn.cloudfunctions.net/solveSudoku",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ sudoku: unsolvedSudoku }),
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                const solvedSudoku = data.solvedSudoku;
                const transformedSudoku = transformGenerateSudoku(
                  unsolvedSudoku,
                  solvedSudoku
                );
                setSudoku({ board: transformedSudoku });
              });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = () => {};

  const handleSave = () => {
    const difficulty = getDifficulty(sudoku.board);
    fb_create_userSudoku({
      userId: user.userId,
      board: sudoku.board,
      type: "scanned",
      difficulty,
    }).then(() => {
      enqueueSnackbar("Sudoku saved!", { variant: "success" });
    });
  };

  const handleSolve = () => {
    setSolvedSudoku({ board: solveSudoku(sudoku.board) });
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>SudoSolve | Scan</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs heading="Scan Sudoku" links={[]} />

        {!alertClosed && (
          <Alert onClose={() => setAlertClosed(true)} severity="info">
            Make sure the Sudoku is centered, straight and dominant in the
            picture for the best result!
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 2, position: "relative" }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upload
              </Typography>
              {!file && (
                <Upload onDrop={handleDrop} onRemove={handleRemoveFile} />
              )}
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ width: "100%" }}
                />
              )}
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              flex: 1,
            }}
          >
            {file && (
              <Card sx={{ p: 2, height: "auto" }}>
                <Stack
                  spacing={2}
                  justifyContent="end"
                  sx={{ height: "100%", pb: 3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    Sudoku
                  </Typography>
                  {sudoku && !solvedSudoku && (
                    <PreviewLevel level={sudoku} size={isMobile ? 26 : 40} />
                  )}

                  {solvedSudoku && (
                    <PreviewLevel
                      level={solvedSudoku}
                      size={isMobile ? 26 : 40}
                    />
                  )}

                  {!loading && !sudoku && (
                    <>
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
                        onClick={handleScan}
                      >
                        Scan
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
                        onClick={handleRemoveFile}
                      >
                        Retry picture
                      </Button>
                    </>
                  )}
                  {sudoku && (
                    <>
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
                        onClick={handlePlay}
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
                        onClick={handleSolve}
                      >
                        Solve
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
                        onClick={handleRemoveFile}
                      >
                        Retry picture
                      </Button>
                    </>
                  )}
                  {loading && (
                    <>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          textAlign: "center",
                          mt: 5,
                        }}
                      >
                        Scanning...
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          textAlign: "center",
                          mt: 5,
                        }}
                      >
                        This may take some time
                      </Typography>
                    </>
                  )}
                </Stack>
              </Card>
            )}
          </Grid>
          {loading && (
            <Lottie
              animationData={loaderAnimation}
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                top: isMobile ? "73%" : "50%",
                left: "50%",
                transformOrigin: "center",
                transform: isMobile
                  ? "translate(-50%, -50%)"
                  : `translate(-50%, -50%) rotate(-90deg)`,
              }}
            />
          )}
        </Grid>
      </Container>
    </>
  );
}
