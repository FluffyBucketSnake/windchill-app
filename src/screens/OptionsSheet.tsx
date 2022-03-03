import React, { useCallback, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonVariant } from "../components/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ListComboBox } from "../components/ListComboBox";
import { THEME } from "../theme";

export interface IOptionsSheetMethods {
  present(): void;
  close(): void;
}

export const OptionsSheet = React.forwardRef<IOptionsSheetMethods>((_, ref) => {
  const refBottomSheet = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    present: () => refBottomSheet.current?.expand(),
    close: () => refBottomSheet.current?.close(),
  }));

  const closeSheet = useCallback(() => refBottomSheet.current?.close(), []);

  return (
    <BottomSheet
      backgroundStyle={styles.background}
      enablePanDownToClose={true}
      handleIndicatorStyle={styles.handleIndicator}
      index={-1}
      ref={refBottomSheet}
      snapPoints={[224]}
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.options}>
          <Text style={styles.title}>Units</Text>
          <ListComboBox
            icon="temperature_regular"
            labelText="Temperature"
            modalTitle="Select the desired unit"
            options={[
              { id: 0, name: "Celsius(ºC)" },
              { id: 1, name: "Fahrenheit(ºF)" },
            ]}
            value={0}
          />
          <ListComboBox
            icon="top_speed_regular"
            labelText="Speed"
            modalTitle="Select the desired unit"
            options={[
              { id: 0, name: "Metric(km/h)" },
              { id: 1, name: "Imperial(mph)" },
            ]}
            value={0}
          />
        </View>
        <View style={styles.footer}>
          <Button style={styles.save} onPress={closeSheet}>
            Save
          </Button>
          <Button variant={ButtonVariant.Secondary}>Reset</Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: THEME.COLORS.BACKGROUND_ALT,
  },
  handleIndicator: {
    backgroundColor: THEME.COLORS.FOREGROUND_ALT,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },
  title: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.REGULAR,
    textAlign: "center",
    ...THEME.FONT_SIZES.TITLE,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
  },
  save: {
    flex: 1,
    marginRight: 8,
  },
});
