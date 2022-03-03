import React, { useCallback, useRef, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { FluentUIIcon } from "./FluentUIIcon";
import { IListItemProps, ListItem } from "./ListItem";
import { ListRadio } from "./ListRadio";
import { THEME } from "../theme";

export interface IOption {
  id: number;
  name: string;
}

export interface IComboBoxProps {
  modalTitle?: string;
  options: IOption[];
  value?: number;
}

const snapPoints = [360];

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
  const onSelect = (id: number) => () => {
    setInnerValue(id);
    dismissModal();
  };

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
      <Modal
        animationType="slide"
        onRequestClose={dismissModal}
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalDialog}>
            {modalTitle && <Text style={styles.modalTitle}>{modalTitle}</Text>}
            <FlatList
              data={options}
              keyExtractor={(option) => String(option.id)}
              renderItem={({ item }) => (
                <ListRadio
                  text={item.name}
                  selected={item.id === innerValue}
                  onPress={onSelect(item.id)}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

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
  modal: {
    flex: 1,
    justifyContent: "center",
  },
  modalDialog: {
    alignItems: "stretch",
    backgroundColor: THEME.COLORS.BACKGROUND_ALT,
    borderRadius: 12,
    marginHorizontal: 32,
    marginVertical: "auto",
    padding: 16,
  },
  modalTitle: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.MEDIUM,
    textAlign: "center",
    ...THEME.FONT_SIZES.TITLE,
  },
});
