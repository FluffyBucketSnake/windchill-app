import React from "react";
import { IListItemProps, ListItem } from "./ListItem";
import { ITextBoxProps, TextBox } from "./TextBox";

export const ListTextBox: React.FC<IListItemProps & ITextBoxProps> = ({
  keyboardType,
  onChangeText,
  suffix,
  value,
  ...props
}) => (
  <ListItem {...props}>
    <TextBox
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      suffix={suffix}
      value={value}
    />
  </ListItem>
);
