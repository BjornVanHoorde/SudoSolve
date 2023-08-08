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
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "src/layouts/dashboard/DashboardLayout";
import { useSettingsContext } from "src/components/settings";
import { useAuthContext } from "src/auth/useAuthContext";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/CustomBreadcrumbs";
import { UploadAvatar } from "src/components/upload";
import { useContext, useEffect, useState } from "react";
import {
  fb_delete_user_picture,
  fb_update_user,
  fb_upload_user_picture,
} from "src/firebase/apis/users";
import { PRIMARY } from "src/theme/palette";
import { useSnackbar } from "src/components/snackbar";
import { dataContext } from "src/firebase/dataProvider";

// GLOBALS
// ------------------------------------------------------------------------------------------------

// EXPORT
// ------------------------------------------------------------------------------------------------
AccountIndexScreen.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function AccountIndexScreen() {
  // DATA & METHODS
  // ------------------------------------------------------------------------------------------------
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const { users } = useContext(dataContext);

  // STATES
  // ------------------------------------------------------------------------------------------------
  const [picture, setPicture] = useState(null);
  const [userSnapshot, setUserSnapshot] = useState(null);

  // VARIABLES
  // ------------------------------------------------------------------------------------------------

  // FUNCTIONS
  // ------------------------------------------------------------------------------------------------
  const onSubmit = async () => {
    if (userSnapshot) {
      let pictureObject = {
        name: "",
        url: "",
        ref: "",
      };
      if (picture) {
        pictureObject = {
          name: picture.name,
          url: picture.url,
          ref: picture.ref,
        };
        if (picture.path) {
          pictureObject = null;
          if (userSnapshot.picture?.url) {
            await fb_delete_user_picture(userSnapshot.picture.ref);
          }
          await fb_upload_user_picture(
            userSnapshot.userId,
            picture.name,
            picture
          )
            .then(() => {
              enqueueSnackbar("Picture edited successfully", {
                variant: "success",
              });
            })
            .catch((error) => {
              enqueueSnackbar(error.message, { variant: "error" });
            });
        }
      } else {
        if (userSnapshot.picture.url) {
          await fb_delete_user_picture(userSnapshot.picture.ref);
        }
      }
      if (pictureObject) {
        fb_update_user(userSnapshot.userId, {
          picture: pictureObject,
        })
          .then(() => {
            enqueueSnackbar("Picture edited successfully", {
              variant: "success",
            });
          })
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: "error" });
          });
      }
    }
  };

  const handlePictureDrop = (acceptedFiles) => {
    // Check if the file is an image
    if (acceptedFiles[0].type.split("/")[0] !== "image") {
      enqueueSnackbar("Only images are allowed", {
        variant: "error",
      });
      return;
    }
    setPicture(acceptedFiles[0]);
  };

  const handlePictureRemove = () => {
    setPicture();
  };

  // EFFECTS
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    if ((user, users)) {
      const currentUser = users.find((u) => u.userId === user.userId);

      if (currentUser) {
        setUserSnapshot(currentUser);
        setPicture(currentUser.picture);
      }
    }
  }, [user, users]);

  // COMPONENT
  // ------------------------------------------------------------------------------------------------
  return (
    <>
      <Head>
        <title>SudoSolve | Account</title>
      </Head>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs heading="Account" links={[]} />

        <Card sx={{ p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {picture && (picture.path || picture.url) ? (
                <Stack alignItems="center">
                  <img
                    src={
                      picture.url ? picture.url : URL.createObjectURL(picture)
                    }
                    alt="avatar"
                    style={{
                      maxWidth: "400px",
                      height: "auto",
                      margin: "0 auto",
                    }}
                  />
                  <Button
                    sx={{ width: "400px", margin: "0 auto" }}
                    color="error"
                    onClick={handlePictureRemove}
                  >
                    Delete avatar
                  </Button>
                </Stack>
              ) : (
                <>
                  <UploadAvatar onDrop={handlePictureDrop} />
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="h4" gutterBottom>
                  {userSnapshot?.username}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userSnapshot?.email}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={picture === userSnapshot?.picture}
              sx={{
                backgroundColor: PRIMARY.main,
                color: "#fff",
                "&:hover": {
                  backgroundColor: PRIMARY.dark,
                  boxShadow: "none",
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
