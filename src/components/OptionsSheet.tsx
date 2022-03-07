import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonVariant } from "./Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ListComboBox } from "./ListComboBox";
import { THEME } from "../theme";
import { speedUnits, temperatureUnits, Unit } from "../models/Unit";
import { DefaultOptions, Options } from "../models/Options";
import { AppBehaviorType, AppBehaviorTypes } from "../models/createAppBehavior";

export interface IOptionsSheetProps {
  onSave?: (options: Options) => void;
  options?: Options;
}

export interface IOptionsSheetMethods {
  present(): void;
  close(): void;
}

export const OptionsSheet = React.forwardRef<
  IOptionsSheetMethods,
  IOptionsSheetProps
>(({ onSave, options }, ref) => {
  const [currentOptions, setCurrentOptions] = useState<Options>(
    options ?? DefaultOptions
  );

  const refBottomSheet = useRef<BottomSheet>(null);

  const changeAppBehavior = useCallback(
    (behavior: AppBehaviorType) => {
      setCurrentOptions((old) => ({
        ...old,
        appBehavior: behavior,
      }));
    },
    [currentOptions]
  );
  const changeSpeedUnit = useCallback(
    (unit: Unit) => {
      setCurrentOptions((old) => ({
        ...old,
        speedUnit: unit,
      }));
    },
    [currentOptions]
  );
  const changeTemperatureUnit = useCallback(
    (unit: Unit) => {
      setCurrentOptions((old) => ({
        ...old,
        temperatureUnit: unit,
      }));
    },
    [currentOptions]
  );
  const closeSheet = useCallback(
    () => refBottomSheet.current?.close(),
    [refBottomSheet]
  );
  const discardChanges = useCallback(
    () => setCurrentOptions(options ?? DefaultOptions),
    [options]
  );
  const resetOptions = useCallback(() => setCurrentOptions(DefaultOptions), []);
  const saveOptions = useCallback(() => {
    onSave?.(currentOptions);
    closeSheet();
  }, [currentOptions]);
  const unitKeyExtractor = useCallback(({ id }: Unit) => id, []);
  const unitNameExtractor = useCallback(
    ({ friendlyName, suffix }: Unit) => `${friendlyName}(${suffix})`,
    []
  );
  const basicExtractor = useCallback((value: string) => value, []);

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
      onClose={discardChanges}
      ref={refBottomSheet}
      snapPoints={[328]}
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.options}>
          <Text style={styles.title}>General</Text>
          <ListComboBox
            label="Operation mode"
            keyExtractor={basicExtractor}
            modalTitle="Select the desired unit"
            nameExtractor={basicExtractor}
            onChange={changeAppBehavior}
            options={AppBehaviorTypes}
            style={styles.lastSectionItem}
            value={currentOptions.appBehavior}
          />
          <Text style={styles.title}>Units</Text>
          <ListComboBox
            icon="temperature_regular"
            label="Temperature"
            keyExtractor={unitKeyExtractor}
            modalTitle="Select the desired unit"
            nameExtractor={unitNameExtractor}
            onChange={changeTemperatureUnit}
            options={temperatureUnits}
            value={currentOptions.temperatureUnit.id}
          />
          <ListComboBox
            icon="top_speed_regular"
            label="Speed"
            keyExtractor={unitKeyExtractor}
            modalTitle="Select the desired unit"
            nameExtractor={unitNameExtractor}
            onChange={changeSpeedUnit}
            options={speedUnits}
            value={currentOptions.speedUnit.id}
          />
        </View>
        <View style={styles.footer}>
          <Button style={styles.save} onPress={saveOptions}>
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
  lastSectionItem: {
    marginBottom: 16,
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
