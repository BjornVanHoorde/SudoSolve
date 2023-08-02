// INFO
// ------------------------------------------------------------------------------------------------

// IMPORTS
// ------------------------------------------------------------------------------------------------
import Head from "next/head";
import {
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
        <title>SudoSolve | Settings</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs heading="Settings" links={[]} />

        {snapshotUser && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6">Gameplay</Typography>
                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">Board alignment</Typography>
                    <Select
                      value={snapshotUser.settings.BA}
                      onChange={(e) => handleChange(e, "BA")}
                    >
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="body1">
                      Auto remove restricted notes
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
                      Highlight matching numbers
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
                      Hightlight restricted cells
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
                    <Typography variant="body1">Highlight errors</Typography>
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
                <Typography variant="h6">Themes</Typography>
                <ColorPresetsOptions />
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
