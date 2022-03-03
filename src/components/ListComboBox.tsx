import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FluentUIIcon } from "./FluentUIIcon";
import { IListItemProps, ListItem } from "./ListItem";
import { THEME } from "../theme";
import { SelectionModal } from "./SelectionModal";

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
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState<number | undefined>(value);

  const openModal = useCallback(() => setModalVisible(true), []);
  const dismissModal = useCallback(() => setModalVisible(false), []);
  const onChangeCallback = useCallback((option: IOption) => {
    setInnerValue(option.id);
    dismissModal();
  }, []);

  return (
    <>
      <ListItem {...props}>
        <View style={styles.view}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.inner}
            onPress={openModal}
          >
            <Text style={styles.text}>
              {innerValue !== undefined ? options[innerValue].name : undefined}
            </Text>
            <FluentUIIcon name="chevron_down_regular" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ListItem>
      <SelectionModal
        keyExtractor={({ id }) => id}
        nameExtrator={({ name }) => name}
        onChange={onChangeCallback}
        onRequestClose={dismissModal}
        options={options}
        title={modalTitle}
        value={value}
        visible={modalVisible}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  inner: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text: {
    color: THEME.COLORS.FOREGROUND,
    marginRight: 4,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
});