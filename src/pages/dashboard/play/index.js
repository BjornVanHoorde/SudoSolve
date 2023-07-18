// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import Difficulties from "src/sections/play/Difficulties";
import { SECONDARY } from "src/theme/palette";
import { PATH_DASHBOARD } from "src/routes/paths";
import { useContext } from "react";
import { isMobileContext } from "src/utils/isMobileProvider";
import { useRouter } from "next/router";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
PlayIndexScreen.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function PlayIndexScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { isMobile } = useContext(isMobileContext);
  const { push } = useRouter();

  // STATES
  // ------------------------------------------------------------------------------------------------

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------

  // EFFECTS
  // ------------------------------------------------------------------------------------------------

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>SudoSolve | Play</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs heading="Levels" links={[]} />

        <Difficulties />

        <Grid container spacing={3} sx={{ mt: isMobile ? 5 : 10 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                pb: 10,
                minHeight: isMobile ? 150 : 300,
                maxHeight: isMobile ? 150 : 300,
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  transform: "scale(1.01)",
                  transition: "all 0.2s ease-in-out",
                },
                backgroundImage: `linear-gradient(to left, ${SECONDARY.main}, ${SECONDARY.lighter})`,
              }}
              onClick={() => {
                push(PATH_DASHBOARD.play.mySudokus);
              }}
            >
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box>
                  <Typography variant="h2" gutterBottom>
                    My
                  </Typography>
                  <Typography variant="h2" gutterBottom>
                    Sudokus
                  </Typography>
                </Box>
                <Box sx={{ overflow: "hidden" }}>
                  <img
                    src="/assets/illustrations/MySudokusImage.png"
                    alt="Scan Image"
                    style={{
                      top: "-0px",
                      right: "20px",
                      position: "absolute",
                      height: "300px",
                    }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                pb: 10,
                minHeight: isMobile ? 150 : 300,
                maxHeight: isMobile ? 150 : 300,
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  transform: "scale(1.01)",
                  transition: "all 0.2s ease-in-out",
                },
                backgroundImage: `linear-gradient(to left, ${SECONDARY.main}, ${SECONDARY.lighter})`,
              }}
              onClick={() => {
                push(PATH_DASHBOARD.play.generate);
              }}
            >
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box>
                  <Typography variant="h2" gutterBottom>
                    Generate
                  </Typography>
                  <Typography variant="h2" gutterBottom>
                    Sudoku
                  </Typography>
                </Box>
                <Box sx={{ overflow: "hidden" }}>
                  <img
                    src="/assets/illustrations/GenerateSudokuImage.png"
                    alt="Scan Image"
                    style={{
                      top: isMobile ? "20px" : "60px",
                      right: isMobile ? "-30px" : "10px",
                      position: "absolute",
                      height: isMobile ? "200px" : "225px",
                    }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
