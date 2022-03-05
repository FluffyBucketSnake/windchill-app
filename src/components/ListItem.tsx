import React from "react";
import { StyleSheet, TextStyle, ViewProps } from "react-native";
import { BaseListItem } from "./BaseListItem";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "../theme";

export type ListItemVariant = "default" | "small" | "primary";

export interface IListItemProps {
  icon?: FluentUIIconName;
  hasSeparator?: boolean;
  label: string;
  variant?: ListItemVariant;
}

export type ListItemProps = IListItemProps;

export const ListItem: React.FC<ListItemProps> = ({
  children,
  icon,
  label,
  variant = "default",
  ...props
}) => {
  const iconComponent = icon && (
    <FluentUIIcon name={icon} size={24} color={THEME.COLORS.FOREGROUND_ALT} />
  );

  const variantStyles = getVariantStyles(variant);

  return (
    <BaseListItem
      iconComponent={iconComponent}
      labelStyle={variantStyles.label}
      labelText={label}
      style={variantStyles.view}
      {...props}
    >
      {children}
    </BaseListItem>
  );
};

const getVariantStyles = (variant: ListItemVariant) =>
  StyleSheet.create({
    label: {
      ...(variant == "small" && styles.smallLabel),
    },
    view: {
      ...(variant == "small" && styles.viewSmall),
    },
  });

const styles = StyleSheet.create({
  smallLabel: {
    fontFamily: THEME.FONTS.REGULAR,
    ...THEME.FONT_SIZES.BODY,
  },
  viewSmall: {
    height: 32,
    marginBottom: 16,
  },
});
