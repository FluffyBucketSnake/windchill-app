import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonVariant } from "../components/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ListComboBox } from "../components/ListComboBox";
import { THEME } from "../theme";
import { speedUnits, temperatureUnits, Unit } from "../models/Unit";
import { DefaultOptions, Options } from "../models/Options";

export interface IOptionsSheetProps {
  value?: Options;
}

export interface IOptionsSheetMethods {
  present(): void;
  close(): void;
}

export const OptionsSheet = React.forwardRef<
  IOptionsSheetMethods,
  IOptionsSheetProps
>(({ value }, ref) => {
  const [currentValue, setCurrentValue] = useState<Options>(
    value ?? DefaultOptions
  );

  const refBottomSheet = useRef<BottomSheet>(null);

  const changeSpeedUnit = useCallback(
    (unit: Unit) => setCurrentValue({ ...currentValue, speedUnit: unit }),
    [currentValue]
  );
  const changeTemperatureUnit = useCallback(
    (unit: Unit) => setCurrentValue({ ...currentValue, temperatureUnit: unit }),
    [currentValue]
  );
  const closeSheet = useCallback(
    () => refBottomSheet.current?.close(),
    [refBottomSheet]
  );
  const resetOptions = useCallback(() => setCurrentValue(DefaultOptions), []);
  const unitKeyExtractor = useCallback(({ id }: Unit) => id, []);
  const unitNameExtractor = useCallback(
    ({ friendlyName, suffix }: Unit) => `${friendlyName}(${suffix})`,
    []
  );

  useImperativeHandle(ref, () => ({
    present: () => refBottomSheet.current?.expand(),
    close: () => closeSheet(),
  }));

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
            keyExtractor={unitKeyExtractor}
            modalTitle="Select the desired unit"
            nameExtractor={unitNameExtractor}
            onChange={changeTemperatureUnit}
            options={temperatureUnits}
            value={currentValue.temperatureUnit.id}
          />
          <ListComboBox
            icon="top_speed_regular"
            labelText="Speed"
            keyExtractor={unitKeyExtractor}
            modalTitle="Select the desired unit"
            nameExtractor={unitNameExtractor}
            onChange={changeSpeedUnit}
            options={speedUnits}
            value={currentValue.speedUnit.id}
          />
        </View>
        <View style={styles.footer}>
          <Button style={styles.save} onPress={closeSheet}>
            Save
          </Button>
          <Button variant={ButtonVariant.Secondary} onPress={resetOptions}>
            Reset
          </Button>
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
