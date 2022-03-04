import React, { ReactElement, useCallback, useMemo, useState } from "react";
import {
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { THEME } from "../theme";
import { ListRadio } from "./ListRadio";

interface ISelectionModalProps<OptionT> {
  options: ReadonlyArray<OptionT>;
  keyExtractor?: (options: OptionT) => number;
  nameExtrator: (option: OptionT) => string;
  onChange?: (option: OptionT) => void;
  title?: string;
  value?: number;
}

type SelectionModalProps<ItemT> = ISelectionModalProps<ItemT> & ModalProps;

export const SelectionModal: <ItemT>(
  props: SelectionModalProps<ItemT>
) => ReactElement = ({
  options,
  keyExtractor,
  nameExtrator,
  onChange,
  title,
  value,
  onRequestClose,
  ...props
}) => {
  type ItemT = typeof options extends ReadonlyArray<infer U> ? U : never;

  const [innerValue, setInnerValue] = useState<number | undefined>(value);

  const keyExtractorCallback =
    keyExtractor &&
    useCallback((item) => keyExtractor(item).toString(), [keyExtractor]);
  const onSelection =
    keyExtractor &&
    useCallback(
      (item: ItemT) => {
        setInnerValue(keyExtractor(item));
        onChange?.(item);
      },
      [onChange]
    );

  return (
    <Modal transparent={true} {...props}>
      <View style={styles.modal}>
        <Pressable style={styles.backdrop} onPress={onRequestClose} />
        <View style={styles.dialog}>
          {title && <Text style={styles.title}>{title}</Text>}
          <FlatList
            data={options}
            keyExtractor={keyExtractorCallback}
            renderItem={({ item }) => (
              <SelectionModalItem
                nameExtrator={nameExtrator}
                option={item}
                selected={
                  keyExtractor !== undefined
                    ? keyExtractor(item) === innerValue
                    : false
                }
                onSelection={onSelection}
              />
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

type SelectionModalItemProps<ItemT> = {
  option: ItemT;
  nameExtrator: (item: ItemT) => string;
  onSelection?: (item: ItemT) => void;
  selected: boolean;
};

const SelectionModalItem: <ItemT>(
  props: SelectionModalItemProps<ItemT>
) => ReactElement = ({ option, selected, nameExtrator, onSelection }) => {
  const onSelectionCallback =
    onSelection &&
    useCallback(() => onSelection?.(option), [onSelection, option]);

  return (
    <ListRadio
      selected={selected}
      text={nameExtrator(option)}
      onPress={onSelectionCallback}
    />
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
  },
  backdrop: {
    position: "absolute",
    backgroundColor: THEME.COLORS.BACKGROUND,
    opacity: 0.75,
    width: "100%",
    height: "100%",
  },
  dialog: {
    alignItems: "stretch",
    backgroundColor: THEME.COLORS.BACKGROUND_ALT,
    borderRadius: 12,
    marginHorizontal: 32,
    marginVertical: "auto",
    padding: 16,
  },
  title: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.MEDIUM,
    textAlign: "center",
    ...THEME.FONT_SIZES.TITLE,
  },
});
