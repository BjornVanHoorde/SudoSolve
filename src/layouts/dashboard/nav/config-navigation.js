// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  home: icon("house-solid"),
  sudoku: icon("sudoku-svgrepo-com"),
  scan: icon("camera-solid"),
  settings: icon("gear-solid"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "",
    items: [
      {
        title: "Home",
        path: PATH_DASHBOARD.home,
        icon: ICONS.home,
      },
      {
        title: "Play",
        path: PATH_DASHBOARD.play.root,
        icon: ICONS.sudoku,
      },
      {
        title: "Scan",
        path: PATH_DASHBOARD.scan.root,
        icon: ICONS.scan,
      },
    ],
  },
  {
    subheader: "Account",
    items: [
      {
        title: "Acccount",
        path: PATH_DASHBOARD.account.root,
        icon: ICONS.user,
      },
      {
        title: "Settings",
        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.settings,
      },
    ],
  },
];

export default navConfig;
