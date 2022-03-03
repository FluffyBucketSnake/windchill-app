import { createIconSetFromFontello } from "@expo/vector-icons";
import React from "react";
import { ColorValue, ViewStyle } from "react-native";
import FluentUIConfig from "./assets/fonts/fluentui/config.json";

export type FluentUIIconName =
  | "temperature_regular"
  | "weather_squalls_regular"
  | "top_speed_regular"
  | "options_filled";

export interface FluentUIIconProps {
  color: ColorValue;
  name?: FluentUIIconName;
  size: number;
  style?: ViewStyle;
}

export const FluentUIIcon = createIconSetFromFontello(
  FluentUIConfig,
  "FluentUI",
  "FluentUI.ttf"
) as React.FC<FluentUIIconProps>;
