import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FluentUIIcon } from "./FluentUIIcon";
import { IListItemProps, ListItem } from "./ListItem";
import { THEME } from "./theme";

export interface IOption {
  id: number;
  name: string;
}

export interface IComboBoxProps {
  modalTitle?: string;
  options: IOption[];
  value?: number;
}

export const ListComboBox: React.FC<IComboBoxProps & IListItemProps> = ({
  modalTitle,
  options,
  value,
  ...props
}) => (
  <ListItem {...props}>
    <View style={styles.view}>
      <TouchableOpacity activeOpacity={0.5} style={styles.inner}>
        <Text style={styles.text}>
          {value != undefined ? options[value].name : undefined}
        </Text>
        <FluentUIIcon name="chevron_down_regular" size={16} color="white" />
      </TouchableOpacity>
    </View>
  </ListItem>
);

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  inner: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  text: {
    color: THEME.COLORS.FOREGROUND,
    marginRight: 4,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
});
