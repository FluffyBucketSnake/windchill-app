import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { BaseListItem } from "./BaseListItem";
import { THEME } from "../theme";

export interface IRadioItemProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  selected?: boolean;
}

export type RadioItemProps = IRadioItemProps;

export const RadioItem: React.FC<RadioItemProps> = ({
  text,
  onPress,
  selected,
}) => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    <View>
      <BaseListItem
        labelText={text}
        iconComponent={<RadioIcon selected={selected} />}
      />
    </View>
  </TouchableOpacity>
);

type RadioIconProps = {
  selected?: boolean;
};

const RadioIcon: React.FC<RadioIconProps> = ({ selected = false }) => {
  const radioStyles = getRadioStyle(selected);
  return (
    <View style={radioStyles.outerCircle}>
      <View style={radioStyles.innerCircle}></View>
    </View>
  );
};

const getRadioStyle = (selected: boolean) =>
  StyleSheet.create({
    outerCircle: {
      borderRadius: 10,
      borderWidth: 2,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      width: 20,
      ...(selected
        ? {
            borderColor: THEME.COLORS.PRIMARY,
          }
        : {
            borderColor: THEME.COLORS.FOREGROUND_ALT,
          }),
    },
    innerCircle: selected
      ? {
          backgroundColor: THEME.COLORS.PRIMARY,
          borderRadius: 5,
          height: 10,
          width: 10,
        }
      : {
          display: "none",
        },
  });
