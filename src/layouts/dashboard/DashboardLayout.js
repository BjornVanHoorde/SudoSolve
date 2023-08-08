import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
// @mui
import { Box } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// auth
import AuthGuard from "../../auth/AuthGuard";
// components
import { useSettingsContext } from "../../components/settings";
//
import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import NavHorizontal from "./nav/NavHorizontal";
import { isMobileContext } from "src/utils/isMobileProvider";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive("up", "lg");

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const [isMobile, setIsMobile] = useState();

  const { pathname } = useRouter();

  // check if the current urlpath is /dashboard/play/sudoku/and id
  const isPlaySudoku = pathname.includes("/dashboard/play/sudoku/");

  const checkIfMobile = () => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Mobile|iPhone|iPod|Android/i;
    const isMobileDevice = mobileRegex.test(userAgent);
    return isMobileDevice;
  };

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(checkIfMobile());
      }, 1); // Adjust the debounce delay as needed
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = (
    <NavVertical openNav={open} onCloseNav={handleClose} />
  );

  const styles = {
    p: 0,
    m: 0,
  };

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          {/* <Header onOpenNav={handleOpen} /> */}

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: "flex" },
              minHeight: { lg: 1 },
              overflow: isMobile && isPlaySudoku ? "hidden" : "auto",
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: "flex" },
            minHeight: { lg: 1 },
            overflow: isMobile && isPlaySudoku ? "hidden" : "auto",
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return <AuthGuard>{renderContent()}</AuthGuard>;
}
