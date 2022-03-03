import React from "react";
import { IListItemProps, ListItem } from "./ListItem";
import { ITextBoxProps, NumericTextBox } from "./TextBox";

export const ListNumericTextBox: React.FC<IListItemProps & ITextBoxProps> = ({
  suffix,
  value,
  ...props
}) => (
  <ListItem {...props}>
    <NumericTextBox suffix={suffix} value={value} />
  </ListItem>
);
