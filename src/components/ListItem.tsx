import React from "react";
import { ViewProps } from "react-native";
import { BaseListItem } from "./BaseListItem";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "../theme";

export interface IListItemProps {
  icon?: FluentUIIconName;
  labelText: string;
}

export type ListItemProps = IListItemProps & ViewProps;

export const ListItem: React.FC<ListItemProps> = ({
  children,
  icon,
  ...props
}) => {
  const iconComponent = icon && (
    <FluentUIIcon name={icon} size={24} color={THEME.COLORS.FOREGROUND_ALT} />
  );

  return (
    <BaseListItem iconComponent={iconComponent} {...props}>
      {children}
    </BaseListItem>
  );
};