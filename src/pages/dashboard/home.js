// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import { PRIMARY, SECONDARY } from "src/theme/palette";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "src/routes/paths";
import { isMobileContext } from "src/utils/isMobileProvider";
import { useContext, useEffect, useState } from "react";
import { useLocales } from "src/locales";
import { dataContext } from "src/firebase/dataProvider";
import { fb_update_user } from "src/firebase/apis/users";

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
  const { translate, onChangeLang, allLangs } = useLocales();
  const { users } = useContext(dataContext);

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [userSnapshot, setUserSnapshot] = useState(null);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [welcomeMessageDialogOpen, setWelcomeMessageDialogOpen] =
    useState(false);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleLangClick = (lang) => {
    onChangeLang(lang.value);
    setLanguageDialogOpen(false);
    fb_update_user(user.userId, {
      settings: {
        ...userSnapshot.settings,
        language: lang.value,
      },
    });
  };

  const handleWelcomeMessageClose = () => {
    setWelcomeMessageDialogOpen(false);
    fb_update_user(user.userId, {
      newUser: false,
    });
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (user && users) {
      setUserSnapshot(
        users.find((userSnapshot) => userSnapshot.userId === user.userId)
      );
    }
  }, [user, users]);

  useEffect(() => {
    if (userSnapshot) {
      if (userSnapshot.newUser) {
        setWelcomeMessageDialogOpen(true);
      }
      if (userSnapshot.settings.language === "") {
        setLanguageDialogOpen(true);
      }
    }
  }, [userSnapshot]);

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

        <Dialog open={welcomeMessageDialogOpen}>
          <DialogTitle>{translate("welcomeToSudoSolve")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <>
                <Typography variant="body1" gutterBottom>
                  {translate("welcomeMessage")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {translate("bapText")}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {translate("supportText")}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {translate("haveFunText")}
                </Typography>
              </>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleWelcomeMessageClose}>
              {translate("ok")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={languageDialogOpen}>
          <DialogTitle>{translate("language")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {translate("chooseALanguage")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {allLangs.map((lang) => (
              <Button
                startIcon={
                  lang.icon && (
                    <img
                      src={lang.icon}
                      alt={lang.label}
                      style={{ height: "25px", width: "25px" }}
                    />
                  )
                }
                variant="outlined"
                key={lang}
                onClick={() => {
                  handleLangClick(lang);
                }}
              >
                {lang.label}
              </Button>
            ))}
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
