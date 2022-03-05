import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FluentUIIcon } from "./FluentUIIcon";
import { IListItemProps, ListItem } from "./ListItem";
import { THEME } from "../theme";
import { SelectionModal } from "./SelectionModal";

export interface IComboBoxProps<OptionT> {
  modalTitle?: string;
  options: OptionT[];
  keyExtractor: (option: OptionT) => string;
  nameExtractor: (option: OptionT) => string;
  onChange?: (option: OptionT) => void;
  value?: string;
}

export type ComboBoxProps<OptionT> = IComboBoxProps<OptionT> & IListItemProps;

export function ListComboBox<OptionT>({
  modalTitle,
  options,
  keyExtractor,
  nameExtractor,
  onChange,
  value,
  ...props
}: ComboBoxProps<OptionT>) {
  const findValueOption = useCallback(
    () => options.find((option) => keyExtractor(option) == value),
    [value]
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState<OptionT | undefined>(
    findValueOption()
  );

  const openModal = useCallback(() => setModalVisible(true), []);
  const dismissModal = useCallback(() => setModalVisible(false), []);
  const onChangeCallback = useCallback((option: OptionT) => {
    setInnerValue(option);
    onChange?.(option);
    dismissModal();
  }, []);

  useEffect(() => setInnerValue(findValueOption()), [value]);

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
              {innerValue !== undefined ? nameExtractor(innerValue) : undefined}
            </Text>
            <FluentUIIcon name="chevron_down_regular" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ListItem>
      <SelectionModal
        keyExtractor={keyExtractor}
        nameExtrator={nameExtractor}
        onChange={onChangeCallback}
        onRequestClose={dismissModal}
        options={options}
        title={modalTitle}
        value={value}
        visible={modalVisible}
      />
    </>
  );
}

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
