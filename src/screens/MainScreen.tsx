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
import Toast from "react-native-root-toast";
import { AppBehaviorType } from "../models/AppBehavior";
import { useAppBehavior } from "../hooks/useAppBehavior";

export const MainScreen: React.FC = () => {
  const [options, setOptions] = useState<Options>(DefaultOptions);
  const refOptionsSheet = useRef<IOptionsSheetMethods>(null);
  const openOptions = useCallback(() => refOptionsSheet.current?.present(), []);

  const onError = useCallback(
    (err: Error) =>
      Toast.show(err.message, {
        duration: 5000,
        backgroundColor: THEME.COLORS.DANGER,
        textColor: THEME.COLORS.PRIMARY_FOREGROUND,
      }),
    []
  );

  const [
    setActualTemperature,
    setWindSpeed,
    tryCalculate,
    perceivedTemperature,
  ] = useAppBehavior(AppBehaviorType.Default, options, onError);

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
            onChangeText={setActualTemperature}
            suffix={options?.temperatureUnit.suffix}
          />
          <ListTextBox
            icon="weather_squalls_regular"
            label="Wind speed"
            keyboardType="numeric"
            onChangeText={setWindSpeed}
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
