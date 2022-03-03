import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "./theme";

export interface IListItemProps {
  icon?: FluentUIIconName;
  label: string;
}

export const ListItem: React.FC<IListItemProps & ViewProps> = ({
  children,
  icon,
  label,
  style,
  ...props
}) => {
  return (
    <View style={[styles.view, style]} {...props}>
      {icon && (
        <FluentUIIcon
          style={styles.icon}
          name={icon}
          size={24}
          color={THEME.COLORS.FOREGROUND_ALT}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        {children}
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
  icon: {
    marginHorizontal: 16,
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
