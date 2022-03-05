import React, { useCallback, useRef, useState } from "react";
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

export const MainScreen: React.FC = () => {
  const [options, setOptions] = useState<Options>(DefaultOptions);

  const refOptionsSheet = useRef<IOptionsSheetMethods>(null);

  const openOptions = useCallback(() => refOptionsSheet.current?.present(), []);

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
            labelText="Actual temperature"
            keyboardType="numeric"
            suffix={options?.temperatureUnit.suffix}
          />
          <ListTextBox
            icon="weather_squalls_regular"
            labelText="Wind speed"
            keyboardType="numeric"
            suffix={options?.speedUnit.suffix}
          />
        </View>
        <View style={styles.footer}>
          <ListItem
            hasSeparator={false}
            labelText="Wind chill factor"
            labelStyle={styles.listLabelSmall}
            style={styles.listItemSmall}
          >
            <Text style={styles.listTextSmall}>35.0</Text>
          </ListItem>
          <View style={styles.buttons}>
            <Button style={styles.btnCalculate}>Calculate</Button>
            <IconButton icon="options_filled" onPress={openOptions} />
          </View>
          <ListItem
            icon="temperature_regular"
            hasSeparator={false}
            labelText="Perceived temperature"
          >
            <Text style={styles.listTextPrimary}>35.0</Text>
          </ListItem>
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
  listItemSmall: {
    height: 32,
    marginBottom: 16,
  },
  listTextSmall: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.REGULAR,
    textAlign: "right",
    ...THEME.FONT_SIZES.BODY,
  },
  listLabelSmall: {
    fontFamily: THEME.FONTS.REGULAR,
    ...THEME.FONT_SIZES.BODY,
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
  listTextPrimary: {
    color: THEME.COLORS.PRIMARY,
    fontFamily: THEME.FONTS.REGULAR,
    textAlign: "right",
    ...THEME.FONT_SIZES.HEADING,
  },
});
