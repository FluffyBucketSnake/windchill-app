import React from "react";
import { IListItemProps, ListItem } from "./ListItem";
import { ITextBoxHandle, ITextBoxProps, TextBox } from "./TextBox";

export type ListTextBoxProps = IListItemProps & ITextBoxProps;

export const ListTextBox = React.forwardRef<ITextBoxHandle, ListTextBoxProps>(
  (
    { keyboardType, onChangeText, onSubmitEditing, suffix, value, ...props },
    ref
  ) => (
    <ListItem {...props}>
      <TextBox
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        suffix={suffix}
        ref={ref}
        value={value}
      />
    </ListItem>
  )
);
