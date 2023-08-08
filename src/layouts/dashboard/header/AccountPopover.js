import { useContext, useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material";
// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../../routes/paths";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import { useSnackbar } from "../../../components/snackbar";
import MenuPopover from "../../../components/menu-popover";
import { IconButtonAnimate } from "../../../components/animate";
import { dataContext } from "src/firebase/dataProvider";
import { useLocales } from "src/locales";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: PATH_DASHBOARD.home,
  },
  {
    label: "account",
    linkTo: PATH_DASHBOARD.account.root,
  },
  {
    label: "settings",
    linkTo: PATH_DASHBOARD.settings.root,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { replace, push } = useRouter();

  const { translate } = useLocales();

  const { user, logout } = useAuthContext();

  const { users } = useContext(dataContext);

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const [userSnapshot, setUserSnapshot] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    push(path);
  };

  useEffect(() => {
    if (user && users) {
      setUserSnapshot(users.find((x) => x.userId === user.userId));
    }
  }, [user, users]);

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={userSnapshot?.picture?.url}
          alt={userSnapshot?.username}
          name={userSnapshot?.username}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userSnapshot?.username}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userSnapshot?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {translate(option.label)}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {translate("logout")}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
