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
import { ListItem } from "../components/ListItem";
import { calculateWindChill } from "../services/calculateWindChill";
import { ListText } from "../components/ListText";

export const MainScreen: React.FC = () => {
  const [options, setOptions] = useState<Options>(DefaultOptions);
  const [actualTemperature, setActualTemperature] = useState<number | null>(
    null
  );
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [perceivedTemperature, setPerceivedTemperature] = useState<
    number | null
  >(null);
  const [windChillFactor, setWindChillFactor] = useState<number | null>(null);

  const refOptionsSheet = useRef<IOptionsSheetMethods>(null);

  const changeActualTemperature = useCallback(
    (text: string) => setActualTemperature(parseFloat(text)),
    [setActualTemperature]
  );
  const changeWindSpeed = useCallback(
    (text: string) => setWindSpeed(parseFloat(text)),
    [setWindSpeed]
  );
  const openOptions = useCallback(() => refOptionsSheet.current?.present(), []);
  const calculateResults = useCallback(() => {
    if (actualTemperature === null || windSpeed === null) {
      return;
    }
    const [Tp, Kwc] = calculateWindChill(
      actualTemperature,
      windSpeed,
      options.temperatureUnit,
      options.speedUnit
    );
    setPerceivedTemperature(Tp);
    setWindChillFactor(Kwc);
  }, [
    actualTemperature,
    windSpeed,
    options,
    setPerceivedTemperature,
    setWindChillFactor,
  ]);

  useEffect(() => {
    setPerceivedTemperature(null);
    setWindChillFactor(null);
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
          {windChillFactor !== null && (
            <ListText
              hasSeparator={false}
              label="Wind chill factor"
              variant="small"
            >
              {windChillFactor.toFixed(2)}
            </ListText>
          )}
          <View style={styles.buttons}>
            <Button onPress={calculateResults} style={styles.btnCalculate}>
              Calculate
            </Button>
            <IconButton icon="options_filled" onPress={openOptions} />
          </View>
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
    marginBottom: 16,
  },
  btnCalculate: {
    flex: 1,
    marginRight: 8,
  },
});
