// @mui
import { Stack, Box } from "@mui/material";
// config
import { NAV } from "../../../config-global";
// utils
import { hideScrollbarX } from "../../../utils/cssStyles";
// components
import Logo from "../../../components/logo";
import { NavSectionMini } from "../../../components/nav-section";
//
import navConfig from "./config-navigation";
import NavToggleButton from "./NavToggleButton";
import { useAuthContext } from "src/auth/useAuthContext";

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAuthContext();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: "auto", my: 2 }} isMini={true} />

        <NavSectionMini
          data={navConfig
            .map((item) => {
              if (
                item.subheader === "Admin" &&
                user?.userId !== "mlmmcP3QwAX4KVS1sQnas0M4Gnq1"
              ) {
                return null;
              }

              return item;
            })
            .filter((item) => item !== null)}
        />
      </Stack>
    </Box>
  );
}
