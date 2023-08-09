// @mui
import { enUS, nlNL } from "@mui/material/locale";

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "/assets/icons/flags/ic_flag_en.svg",
  },
  {
    label: "Nederlands",
    value: "nl",
    systemValue: nlNL,
    icon: "/assets/icons/flags/ic_flag_nl.svg",
  },
];

export const defaultLang = allLangs[0]; // English
