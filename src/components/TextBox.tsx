import React, { useCallback, useImperativeHandle, useRef } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { THEME } from "../theme";

export interface ITextBoxProps {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  suffix?: string;
  value?: string;
}

export interface ITextBoxHandle {
  focus(): void;
}

export const TextBox = React.forwardRef<ITextBoxHandle, ITextBoxProps>(
  ({ keyboardType, onChangeText, onSubmitEditing, suffix, value }, ref) => {
    const refTextInput = useRef<TextInput>(null);
    const focusTextInput = useCallback(() => refTextInput.current?.focus(), []);

    useImperativeHandle(ref, () => ({
      focus: () => refTextInput.current?.focus(),
    }));

    return (
      <Pressable onPress={focusTextInput} style={styles.view}>
        <TextInput
          style={styles.input}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          ref={refTextInput}
        />
        <Text style={styles.suffix}> {suffix}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    display: "flex",
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
