/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { colors } from "./Colors";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const ThemeColors = {
  light: {
    text: {
      base: colors["grey-900"],
      heading: colors["grey-950"],
      details: colors["grey-400"],
      disabled: colors["grey-600"],
      inverse: colors["grey-50"],
      brand: colors["yellow-400"],
      link: colors["blue-700"],
      info: colors["blue-600"],
      success: colors["green-500"],
      warning: colors["yellow-500"],
      danger: colors["red-500"],
    },
    background: {
      base: colors.white,
      secondary: colors["grey-100"],
      "secondary-pressed": colors["grey-200"],
      "secondary-selected": colors["yellow-400"],
      inner: colors.white,
      disabled: colors["grey-400"],
      inverse: colors["grey-950"],
      "inverse-pressed": colors["grey-900"],
      "inverse-selected": colors["yellow-400"],
      brand: colors["yellow-400"],
      success: colors["green-500"],
      warning: colors["yellow-500"],
      danger: colors["red-500"],
    },
    border: {
      base: colors["grey-200"],
      disabled: colors["grey-300"],
      inverse: colors["grey-950"],
      brand: colors["yellow-400"],
      info: colors["blue-600"],
      success: colors["green-600"],
      warning: colors["yellow-500"],
      danger: colors["red-600"],
    },

    tabIconSelected: tintColorLight,
  },
  dark: {
    text: {
      base: colors["grey-100"],
      heading: colors["grey-50"],
      details: colors["grey-200"],
      disabled: colors["grey-400"],
      inverse: colors["grey-950"],
      brand: colors["yellow-300"],
      link: colors["blue-500"],
      info: colors["blue-400"],
      success: colors["green-400"],
      warning: colors["yellow-400"],
      danger: colors["red-400"],
    },
    background: {
      base: colors.black,
      secondary: colors["grey-900"],
      "secondary-pressed": colors["grey-800"],
      "secondary-selected": colors["yellow-400"],
      inner: colors["grey-950"],
      disabled: colors["grey-600"],
      inverse: colors["grey-50"],
      "inverse-pressed": colors["grey-100"],
      "inverse-selected": colors["yellow-400"],
      brand: colors["yellow-400"],
      success: colors["green-400"],
      warning: colors["yellow-500"],
      danger: colors["red-400"],
    },
    border: {
      base: colors["grey-700"],
      disabled: colors["grey-500"],
      inverse: colors["grey-100"],
      brand: colors["yellow-400"],
      info: colors["blue-500"],
      success: colors["green-500"],
      warning: colors["yellow-500"],
      danger: colors["red-500"],
    },
    tabIconSelected: tintColorDark,
  },
};
