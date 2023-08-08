// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
};

export const PATH_PAGE = {
  page403: "/403",
  page404: "/404",
  page500: "/500",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, "/home"),
  play: {
    root: path(ROOTS_DASHBOARD, "/play"),
    difficulty: (difficulty) => path(ROOTS_DASHBOARD, `/play/${difficulty}`),
    mySudokus: path(ROOTS_DASHBOARD, "/play/my-sudokus"),
    generate: path(ROOTS_DASHBOARD, "/play/generate"),
    sudoku: (id) => path(ROOTS_DASHBOARD, `/play/sudoku/${id}`),
  },
  scan: {
    root: path(ROOTS_DASHBOARD, "/scan"),
  },
  account: {
    root: path(ROOTS_DASHBOARD, "/account"),
  },
  settings: {
    root: path(ROOTS_DASHBOARD, "/settings"),
  },
  admin: {
    root: path(ROOTS_DASHBOARD, "/admin"),
  },
};
