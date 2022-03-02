import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { THEME } from "./theme";

export interface ITextBoxProps {
  label: string;
  value?: string | undefined;
  suffix?: string;
}

export const TextBox: React.FC<ITextBoxProps> = ({ label, value, suffix }) => {
  const refTextInput = useRef<TextInput>(null);
  const focusTextInput = useCallback(
    () => refTextInput.current?.focus(),
    [refTextInput]
  );

  return (
    <TouchableWithoutFeedback onPress={focusTextInput}>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textBoxView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 48,
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.FOREGROUND_ALT,
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
