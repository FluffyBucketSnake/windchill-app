import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { TextBox } from "./TextBox";
import { THEME } from "./theme";
import { Button } from "./Button";

export const MainScreen: React.FC = () => (
  <SafeAreaView style={styles.mainPage}>
    <StatusBar style="auto" />
    <View style={styles.header}>
      <Text style={styles.headline}>Wind chill calculator</Text>
      <Text style={styles.caption}>
        Calculate the perceived temperature by providing the actual temperature
        and the wind speed
      </Text>
    </View>
    <View>
      <TextBox label="Actual temperature" suffix="ºC" />
      <TextBox label="Wind speed" suffix="km/h" />
    </View>
    <View style={styles.footer}>
      <Button style={styles.btnCalculate}>Calculate</Button>
      <Button>Options</Button>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  mainPage: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
    height: "100%",
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headline: {
    color: THEME.COLORS.FOREGROUND,
    ...THEME.FONT_SIZES.HEADLINE,
  },
  caption: {
    textAlign: "center",
    color: THEME.COLORS.FOREGROUND_ALT,
    ...THEME.FONT_SIZES.BODY,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: "auto",
  },
  btnCalculate: {
    flex: 1,
    marginRight: 8,
  },
});
