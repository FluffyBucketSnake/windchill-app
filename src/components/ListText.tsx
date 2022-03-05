import React from "react";
import { StyleSheet, Text } from "react-native";
import { THEME } from "../theme";
import { ListItem, ListItemProps, ListItemVariant } from "./ListItem";

export interface IListTextProps {
  children: string;
  variant?: ListItemVariant;
}

export type ListTextProps = IListTextProps & ListItemProps;

export const ListText: React.FC<ListItemProps> = ({
  children,
  variant = "default",
  ...props
}) => (
  <ListItem variant={variant} {...props}>
    <Text style={getVariantStyles(variant).text}>{children}</Text>
  </ListItem>
);

const getVariantStyles = (variant: ListItemVariant) =>
  StyleSheet.create({
    text: {
      ...styles.text,
      ...(variant === "small" && styles.textSmall),
      ...(variant === "primary" && styles.textPrimary),
    },
  });

const styles = StyleSheet.create({
  text: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.REGULAR,
    textAlign: "right",
    ...THEME.FONT_SIZES.SUBHEADING,
  },
  textPrimary: {
    color: THEME.COLORS.PRIMARY,
  },
  textSmall: {
    fontFamily: THEME.FONTS.REGULAR,
    ...THEME.FONT_SIZES.BODY,
  },
});
