// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import { PRIMARY, SECONDARY } from "src/theme/palette";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "src/routes/paths";
import { isMobileContext } from "src/utils/isMobileProvider";
import { useContext } from "react";
import { useLocales } from "src/locales";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function GeneralAppPage() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();
  const { isMobile } = useContext(isMobileContext);
  const { translate } = useLocales();

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
        <title>SudoSolve | Home</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <Card
          sx={{
            p: 3,
            pb: 10,
            mt: 3,
            mb: 3,
            maxHeight: 200,
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              transform: "scale(1.01)",
              transition: "all 0.2s ease-in-out",
            },
            backgroundImage: `linear-gradient(to left, ${PRIMARY.main}, ${PRIMARY.lighter})`,
          }}
          onClick={() => {
            push(PATH_DASHBOARD.play.root);
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h1" gutterBottom>
              PLAY
            </Typography>
            <Box sx={{ overflow: "hidden" }}>
              <img
                src="/assets/illustrations/PlayImage.png"
                alt="Play Image"
                style={{
                  top: isMobile ? "-100px" : "-200px",
                  right: "-100px",
                  position: "absolute",
                }}
              />
            </Box>
          </Stack>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                pb: 10,
                minHeight: isMobile ? 200 : 300,
                maxHeight: isMobile ? 200 : 300,
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  transform: "scale(1.01)",
                  transition: "all 0.2s ease-in-out",
                },
                backgroundImage: `linear-gradient(to left, ${SECONDARY.main}, ${SECONDARY.lighter})`,
              }}
              onClick={() => {
                push(PATH_DASHBOARD.scan.root);
              }}
            >
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h1" gutterBottom>
                  SCAN
                </Typography>
                <Box sx={{ overflow: "hidden" }}>
                  <img
                    src="/assets/illustrations/ScanImage.png"
                    alt="Scan Image"
                    style={{
                      top: "20px",
                      right: isMobile ? "-20px" : "20px",
                      position: "absolute",
                    }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2.5}>
              <Card
                sx={{
                  p: 3,
                  pb: 10,
                  minHeight: 140,
                  maxHeight: 140,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    transform: "scale(1.01)",
                    transition: "all 0.2s ease-in-out",
                  },
                  backgroundImage: `linear-gradient(to left, ${SECONDARY.main}, ${SECONDARY.lighter})`,
                }}
                onClick={() => {
                  push(PATH_DASHBOARD.settings.root);
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography variant="h2" gutterBottom>
                    {translate("themes").toUpperCase()}
                  </Typography>
                  <Box sx={{ overflow: "hidden" }}>
                    <img
                      src="/assets/illustrations/ThemesImage.png"
                      alt="Learn Image"
                      style={{
                        top: "-20px",
                        right: isMobile ? "-70px" : "-10px",
                        position: "absolute",
                        height: "200px",
                      }}
                    />
                  </Box>
                </Stack>
              </Card>
              <Card
                sx={{
                  p: 3,
                  pb: 10,
                  minHeight: 140,
                  maxHeight: 140,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    transform: "scale(1.01)",
                    transition: "all 0.2s ease-in-out",
                  },
                  backgroundImage: `linear-gradient(to left, ${SECONDARY.main}, ${SECONDARY.lighter})`,
                }}
                onClick={() => {
                  push(PATH_DASHBOARD.settings.root);
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography variant="h2" gutterBottom>
                    {translate("settings").toUpperCase()}
                  </Typography>
                  <Box sx={{ overflow: "hidden" }}>
                    <img
                      src="/assets/illustrations/SettingsImage.png"
                      alt="Learn Image"
                      style={{
                        top: "10px",
                        right: isMobile ? "-20px" : "20px",
                        position: "absolute",
                        height: "125px",
                      }}
                    />
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
