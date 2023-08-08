// theme
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

const themePalette = palette("light");

export const presets = [
  // DEFAULT
  {
    name: "default",
    ...themePalette.primary,
  },
  // CYAN
  {
    name: "cyan",
    lighestest: "#E6FCFF",
    lightest: "#CCF4FE",
    lighter: "#B5F5EC",
    light: "#68CDF9",
    main: "#078DEE",
    dark: "#0351AB",
    darker: "#012972",
    contrastText: "#FFFFFF",
  },
  // PURPLE
  {
    name: "purple",
    lightestest: "#F3E5F5",
    lightest: "#EBD6FD",
    lighter: "#E6BDF0",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#FFFFFF",
  },
  // BLUE
  {
    name: "blue",
    lightestest: "#DCEEFB",
    lightest: "#D1E9FC",
    lighter: "#B6E0FE",
    light: "#76B0F1",
    main: "#2065D1",
    dark: "#103996",
    darker: "#061B64",
    contrastText: "#FFFFFF",
  },
  // ORANGE
  {
    name: "orange",
    lightestest: "#FFEFE6",
    lightest: "#FEF4D4",
    lighter: "#FFD3BA",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: themePalette.grey[800],
  },
  // RED
  {
    name: "red",
    lightestest: "#FFE9D5",
    lightest: "#FFE3D5",
    lighter: "#FFE3E3",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#FFFFFF",
  },
];

export const defaultPreset = presets[0];
export const cyanPreset = presets[1];
export const purplePreset = presets[2];
export const bluePreset = presets[3];
export const orangePreset = presets[4];
export const redPreset = presets[5];

export const presetsOption = presets.map((color) => ({
  name: color.name,
  value: color.main,
}));

export function getPresets(key) {
  return {
    default: defaultPreset,
    cyan: cyanPreset,
    purple: purplePreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
  }[key];
}
