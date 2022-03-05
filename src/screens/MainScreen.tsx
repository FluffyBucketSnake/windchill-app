import React, { useCallback, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
import { THEME } from "../theme";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { ListTextBox } from "../components/ListTextBox";
import { BlurView } from "expo-blur";
import { IOptionsSheetMethods, OptionsSheet } from "./OptionsSheet";
import { DefaultOptions, Options } from "../models/Options";
import { calculateWindChill } from "../services/calculateWindChill";
import { ListText } from "../components/ListText";
import Toast from "react-native-root-toast";

export const MainScreen: React.FC = () => {
  const [options, setOptions] = useState<Options>(DefaultOptions);
  const [actualTemperature, setActualTemperature] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [perceivedTemperature, setPerceivedTemperature] = useState<
    number | null
  >(null);

  const refOptionsSheet = useRef<IOptionsSheetMethods>(null);

  const calculateResults = useCallback(() => {
    const Ta = parseNumber(actualTemperature, "actual temperature");
    const v = parseNonNegative(windSpeed, "wind speed");
    const Tp = calculateWindChill(
      Ta,
      v,
      options.temperatureUnit,
      options.speedUnit
    );
    setPerceivedTemperature(Tp);
  }, [actualTemperature, windSpeed, options, setPerceivedTemperature]);
  const changeActualTemperature = useCallback(
    (text: string) => setActualTemperature(text),
    [setActualTemperature]
  );
  const changeWindSpeed = useCallback(
    (text: string) => setWindSpeed(text),
    [setWindSpeed]
  );
  const openOptions = useCallback(() => refOptionsSheet.current?.present(), []);
  const tryCalculate = useCallback(() => {
    try {
      calculateResults();
    } catch (err) {
      const message = (err as Error).message;
      Toast.show(message, {
        duration: 5000,
        backgroundColor: THEME.COLORS.DANGER,
        textColor: THEME.COLORS.PRIMARY_FOREGROUND,
      });
    }
  }, [calculateResults]);

  useEffect(() => {
    setPerceivedTemperature(null);
  }, [options]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/background.jpg")}
        style={styles.background}
      />
      <BlurView intensity={100} style={styles.content} tint="dark">
        <View style={styles.header}>
          <Text style={styles.headline}>Wind chill calculator</Text>
          <Text style={styles.caption}>
            Calculate the perceived temperature by providing the actual
            temperature and the wind speed
          </Text>
        </View>
        <View style={styles.form}>
          <ListTextBox
            icon="temperature_regular"
            label="Actual temperature"
            keyboardType="numeric"
            onChangeText={changeActualTemperature}
            suffix={options?.temperatureUnit.suffix}
          />
          <ListTextBox
            icon="weather_squalls_regular"
            label="Wind speed"
            keyboardType="numeric"
            onChangeText={changeWindSpeed}
            suffix={options?.speedUnit.suffix}
          />
        </View>
        <View style={styles.footer}>
          {perceivedTemperature !== null && (
            <ListText
              icon="temperature_regular"
              hasSeparator={false}
              label="Perceived temperature"
              variant="primary"
            >
              {`${perceivedTemperature.toFixed(2)} ${
                options.temperatureUnit.suffix
              }`}
            </ListText>
          )}
          <View style={styles.buttons}>
            <Button onPress={tryCalculate} style={styles.btnCalculate}>
              Calculate
            </Button>
            <IconButton icon="options_filled" onPress={openOptions} />
          </View>
        </View>
        <OptionsSheet
          ref={refOptionsSheet}
          options={options}
          onSave={setOptions}
        />
      </BlurView>
    </SafeAreaView>
  );
};

function parseNumber(text: string, context: string): number {
  if (!text) {
    throw new Error(`Input a different ${context} value.`);
  }
  if (!text.match(/^\-?\d+(.\d+)?$/)) {
    throw new Error(`${capitalizeFirst(context)} is not a valid number.`);
  }
  return parseFloat(text);
}

function parseNonNegative(text: string, context: string): number {
  const result = parseNumber(text, context);
  if (result < 0) {
    throw new Error(`${capitalizeFirst(context)} cannot be negative.`);
  }
  return result;
}

const capitalizeFirst: (text: string) => string = (text) =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

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
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: 16,
  },
  btnCalculate: {
    flex: 1,
    marginRight: 8,
  },
});
