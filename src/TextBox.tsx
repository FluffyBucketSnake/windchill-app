import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FluentUIIcon, FluentUIIconName } from "./FluentUIIcon";
import { THEME } from "./theme";

export interface ITextBoxProps {
  icon?: FluentUIIconName;
  label: string;
  value?: string | undefined;
  suffix?: string;
}

export const TextBox: React.FC<ITextBoxProps> = ({
  icon,
  label,
  value,
  suffix,
}) => {
  const refTextInput = useRef<TextInput>(null);
  const focusTextInput = useCallback(
    () => refTextInput.current?.focus(),
    [refTextInput]
  );

  return (
    <TouchableWithoutFeedback onPress={focusTextInput}>
      <View style={styles.listItemView}>
        {icon && (
          <FluentUIIcon
            style={styles.listItemIcon}
            name={icon}
            size={24}
            color={THEME.COLORS.FOREGROUND_ALT}
          />
        )}
        <View style={styles.textBoxView}>
          <Text style={styles.textBoxLabel}>{label}</Text>
          <TextInput
            style={styles.textBoxInput}
            value={value}
            keyboardType="numeric"
            ref={refTextInput}
          />
          <Text style={styles.textBoxInputSuffix}> {suffix}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listItemView: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 48,
    width: "100%",
  },
  listItemIcon: {
    marginHorizontal: 16,
  },
  textBoxView: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.FOREGROUND_ALT,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    flex: 1,
  },
  textBoxLabel: {
    color: THEME.COLORS.FOREGROUND_ALT,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
  textBoxInput: {
    flex: 1,
    textAlign: "right",
    color: THEME.COLORS.FOREGROUND,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
  textBoxInputSuffix: {
    color: THEME.COLORS.FOREGROUND,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
});
