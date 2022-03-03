import React, { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import { THEME } from "../theme";

export enum ButtonVariant {
  Primary,
  Secondary,
}

export interface IButtonProps {
  children?: string;
  onClick?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  variant?: ButtonVariant;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  style,
  variant = ButtonVariant.Primary,
}) => {
  const [isActive, setActive] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      onPress={onClick}
    >
      <View style={[styles.view, getFillColor(variant, isActive), style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    fontFamily: THEME.FONTS.MEDIUM,
    color: THEME.COLORS.PRIMARY_FOREGROUND,
    textTransform: "uppercase",
    ...THEME.FONT_SIZES.BODY,
  },
});

const getFillColor = (variant: ButtonVariant, isActive: boolean) => ({
  backgroundColor:
    variant == ButtonVariant.Primary
      ? isActive
        ? THEME.COLORS.PRIMARY_ALT
        : THEME.COLORS.PRIMARY
      : isActive
      ? THEME.COLORS.SECONDARY_ALT
      : THEME.COLORS.SECONDARY,
});
