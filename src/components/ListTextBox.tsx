import React from "react";
import { IListItemProps, ListItem } from "./ListItem";
import { ITextBoxProps, TextBox } from "./TextBox";

export const ListTextBox: React.FC<IListItemProps & ITextBoxProps> = ({
  suffix,
  value,
  keyboardType,
  ...props
}) => (
  <ListItem {...props}>
    <TextBox suffix={suffix} value={value} keyboardType={keyboardType} />
  </ListItem>
);
