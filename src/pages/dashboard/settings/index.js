// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { fb_update_user } from "src/firebase/apis/users";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "src/firebase/dataProvider";
import ColorPresetsOptions from "src/components/settings/drawer/ColorPresetsOptions";
import { useTheme } from "@emotion/react";
import { useLocales } from "src/locales";
import Iconify from "src/components/iconify/Iconify";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
SettingsIndexScreen.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function SettingsIndexScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { users } = useContext(dataContext);
  const theme = useTheme();
  const { onChangeLang, currentLang, allLangs, translate } = useLocales();

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [snapshotUser, setSnapshotUser] = useState(null);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const handleChange = (e, key) => {
    if (key === "BA") {
      fb_update_user(user.userId, {
        settings: { ...snapshotUser.settings, [key]: e.target.value },
      });
    } else {
      fb_update_user(user.userId, {
        settings: { ...snapshotUser.settings, [key]: e.target.checked },
      });
    }
  };

  const handleReportClick = () => {
    const receiverEmail = "sudosolve@hotmail.com";
    const subject = encodeURIComponent(translate("bugReportOrFeedback"));
    const body = encodeURIComponent(
      translate("pleaseDescribeTheIssueOrProvideFeedbackHere")
    );

    const mailtoLink = `mailto:${receiverEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (users) {
      setSnapshotUser(users.find((u) => u.userId === user.userId));
    }
  }, [user, users]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>{"SudoSolve | " + translate("settings")}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"} sx={{ mt: 1 }}>
        <CustomBreadcrumbs
          heading={translate("settings")}
          links={[]}
          action={
            <Button
              endIcon={<Iconify icon="cil:paper-plane" />}
              variant="contained"
              color="warning"
              onClick={handleReportClick}
            >
              {translate("reportSomething")}
            </Button>
          }
        />

        {snapshotUser && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6">{translate("gameplay")}</Typography>
                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      {translate("language")}
                    </Typography>
                    <Select
                      value={currentLang.value}
                      onChange={(e) => onChangeLang(e.target.value)}
                    >
                      {allLangs.map((lang) => (
                        <MenuItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      {translate("boardAlignment")}
                    </Typography>
                    <Select
                      value={snapshotUser.settings.BA}
                      onChange={(e) => handleChange(e, "BA")}
                    >
                      <MenuItem value="left">{translate("left")}</MenuItem>
                      <MenuItem value="right">{translate("right")}</MenuItem>
                    </Select>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      {translate("autoRemoveRestrictedNotes")}
                    </Typography>
                    <Switch
                      checked={snapshotUser.settings.ARRN}
                      onChange={(e) => handleChange(e, "ARRN")}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      {translate("highlightMatchingNumbers")}
                    </Typography>
                    <Switch
                      checked={snapshotUser.settings.HMN}
                      onChange={(e) => handleChange(e, "HMN")}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      {translate("highlightRestrictedCells")}
                    </Typography>
                    <Switch
                      checked={snapshotUser.settings.HRC}
                      onChange={(e) => handleChange(e, "HRC")}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      {translate("highlightErrors")}
                    </Typography>
                    <Switch
                      checked={snapshotUser.settings.HE}
                      onChange={(e) => handleChange(e, "HE")}
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6">{translate("themes")}</Typography>
                <ColorPresetsOptions />
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
