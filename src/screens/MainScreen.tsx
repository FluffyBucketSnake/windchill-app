import React, { useCallback, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
import { THEME } from "../theme";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { ListTextBox } from "../components/ListTextBox";
import { BlurView } from "expo-blur";
import { IOptionsSheetMethods, OptionsSheet } from "../components/OptionsSheet";
import { DefaultOptions, Options } from "../models/Options";
import { ListText } from "../components/ListText";
import { useAppBehavior } from "../hooks/useAppBehavior";
import { Unit } from "../models/Unit";
import { CalculationResults } from "../models/IAppBehavior";
import { ITextBoxHandle } from "../components/TextBox";

export const MainScreen: React.FC = () => {
  const [options, setOptions] = useState<Options>(DefaultOptions);
  const refOptionsSheet = useRef<IOptionsSheetMethods>(null);
  const openOptions = useCallback(() => refOptionsSheet.current?.present(), []);

  const [
    setActualTemperature,
    setWindSpeed,
    tryCalculatingResults,
    actualTemperature,
    windSpeed,
    results,
    showCalculate,
  ] = useAppBehavior(options);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/background.jpg")}
        style={styles.background}
      />
      <BlurView intensity={100} style={styles.content} tint="dark">
        <Header />
        <InputForm
          actualTemperature={actualTemperature}
          setActualTemperature={setActualTemperature}
          windSpeed={windSpeed}
          setWindSpeed={setWindSpeed}
          temperatureUnit={options.temperatureUnit}
          speedUnit={options.speedUnit}
          onSubmit={tryCalculatingResults}
        />
        <Footer
          onCalculatePress={tryCalculatingResults}
          onOptionsPress={openOptions}
          results={results}
          showCalculateButton={showCalculate}
          temperatureUnit={options.temperatureUnit}
        />
        <OptionsSheet
          ref={refOptionsSheet}
          options={options}
          onSave={setOptions}
        />
      </BlurView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.headline}>Wind chill calculator</Text>
    <Text style={styles.caption}>
      Calculate the perceived temperature by providing the actual temperature
      and the wind speed
    </Text>
  </View>
);

type InputFormProps = {
  actualTemperature: string;
  windSpeed: string;
  setActualTemperature: (text: string) => void;
  setWindSpeed: (text: string) => void;
  temperatureUnit: Unit;
  speedUnit: Unit;
  onSubmit: () => void;
};

const InputForm: React.FC<InputFormProps> = ({
  actualTemperature,
  windSpeed,
  setActualTemperature,
  setWindSpeed,
  temperatureUnit,
  speedUnit,
  onSubmit,
}) => {
  const refSecond = useRef<ITextBoxHandle>(null);

  const focusSecond = useCallback(
    () => refSecond.current?.focus(),
    [refSecond]
  );

  return (
    <View style={styles.form}>
      <ListTextBox
        icon="temperature_regular"
        label="Actual temperature"
        keyboardType="numeric"
        onChangeText={setActualTemperature}
        onSubmitEditing={focusSecond}
        suffix={temperatureUnit.suffix}
        value={actualTemperature}
      />
      <ListTextBox
        icon="weather_squalls_regular"
        label="Wind speed"
        keyboardType="numeric"
        onChangeText={setWindSpeed}
        onSubmitEditing={onSubmit}
        ref={refSecond}
        suffix={speedUnit.suffix}
        value={windSpeed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  background: {
    height: "100%",
    aspectRatio: 1,
    width: undefined,
    zIndex: -1,
  },
  content: {
    alignItems: "stretch",
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 64,
    position: "absolute",
    width: "100%",
  },
  header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  headline: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.LIGHT,
    marginBottom: 8,
    ...THEME.FONT_SIZES.HEADLINE,
  },
  caption: {
    color: THEME.COLORS.FOREGROUND_ALT,
    textAlign: "center",
    ...THEME.FONT_SIZES.BODY,
  },
  form: {
    display: "flex",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: "auto",
  },
  error: {
    color: THEME.COLORS.DANGER,
    fontFamily: THEME.FONTS.MEDIUM,
    minHeight: 48,
    textAlignVertical: "center",
    textAlign: "center",
    ...THEME.FONT_SIZES.BODY,
  },
  buttons: {
    alignItems: "flex-end",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 16,
  },
  btnCalculate: {
    flex: 1,
    marginRight: 8,
  },
});

type FooterProps = {
  onCalculatePress: () => void;
  onOptionsPress: () => void;
  results: CalculationResults;
  showCalculateButton: boolean;
  temperatureUnit: Unit;
};

const Footer: React.FC<FooterProps> = ({
  onCalculatePress,
  onOptionsPress,
  showCalculateButton,
  results,
  temperatureUnit,
}) => (
  <View style={styles.footer}>
    {results &&
      (results instanceof Error ? (
        <Text style={styles.error}>Error: {results && results.message}</Text>
      ) : (
        <ListText
          icon="temperature_regular"
          hasSeparator={false}
          label="Perceived temperature"
          variant="primary"
        >
          {`${results.toFixed(2)} ${temperatureUnit.suffix}`}
        </ListText>
      ))}
    <View style={styles.buttons}>
      {showCalculateButton && (
        <Button onPress={onCalculatePress} style={styles.btnCalculate}>
          Calculate
        </Button>
      )}
      <IconButton icon="options_filled" onPress={onOptionsPress} />
    </View>
  </View>
);
