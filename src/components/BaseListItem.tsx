import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "../theme";

export interface IBaseListItemProps {
  iconComponent?: React.ReactNode;
  hasSeparator?: boolean;
  labelText: string;
  labelStyle?: TextStyle;
}

export type BaseListItemProps = IBaseListItemProps & ViewProps;

export const BaseListItem: React.FC<BaseListItemProps> = ({
  children,
  iconComponent,
  hasSeparator = true,
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
      <View style={[styles.content, hasSeparator && separatorStyle]}>
        <Text style={[styles.label, labelStyle]}>{labelText}</Text>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "row",
    height: 48,
  },
  iconContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
  },
  childrenContainer: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
  },
  label: {
    color: THEME.COLORS.FOREGROUND_ALT,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
});

const separatorStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderColor: THEME.COLORS.FOREGROUND_ALT,
};
