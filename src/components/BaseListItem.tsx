import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewProps } from "react-native";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "../theme";

export interface IBaseListItemProps {
  iconComponent?: React.ReactNode;
  labelText: string;
  labelStyle?: TextStyle;
}

export type BaseListItemProps = IBaseListItemProps & ViewProps;

export const BaseListItem: React.FC<BaseListItemProps> = ({
  children,
  iconComponent,
  labelText,
  labelStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.view, style]} {...props}>
      {iconComponent && (
        <View style={styles.iconContainer}>{iconComponent}</View>
      )}
      <View style={styles.content}>
        <Text style={[styles.label, labelStyle]}>{labelText}</Text>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 48,
    width: "100%",
  },
  iconContainer: {
    marginHorizontal: 16,
  },
  childrenContainer: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.FOREGROUND_ALT,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: 48,
    marginHorizontal: 16,
  },
  label: {
    color: THEME.COLORS.FOREGROUND_ALT,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
});
