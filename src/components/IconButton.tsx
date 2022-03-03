import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "../theme";

export interface IIconButtonProps {
  icon: FluentUIIconName;
  onPress?: (event: GestureResponderEvent) => void;
}

export const IconButton: React.FC<IIconButtonProps> = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <FluentUIIcon name={icon} size={24} color={THEME.COLORS.FOREGROUND} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
});
