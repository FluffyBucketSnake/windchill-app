import React, { useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { THEME } from "../theme";

export interface ITextBoxProps {
  suffix?: string;
  value?: string;
}

export const NumericTextBox: React.FC<ITextBoxProps> = ({ value, suffix }) => {
  const refTextInput = useRef<TextInput>(null);
  const focusTextInput = useCallback(() => refTextInput.current?.focus(), []);

  return (
    <TouchableWithoutFeedback onPress={focusTextInput}>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          value={value}
          keyboardType="numeric"
          ref={refTextInput}
        />
        <Text style={styles.suffix}> {suffix}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  input: {
    color: THEME.COLORS.FOREGROUND,
    flex: 1,
    textAlign: "right",
    ...THEME.FONT_SIZES.SUBHEADING,
  },
  suffix: {
    color: THEME.COLORS.FOREGROUND,
    ...THEME.FONT_SIZES.SUBHEADING,
  },
});
