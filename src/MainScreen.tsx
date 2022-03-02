import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Text, SafeAreaView, StyleSheet, View } from "react-native";
import { TextBox } from "./TextBox";
import { THEME } from "./theme";

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
    <View>
      <Button title="Calculate" onPress={() => {}} />
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
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headline: {
    ...THEME.FONT_SIZES.HEADLINE,
  },
  caption: {
    textAlign: "center",
    ...THEME.FONT_SIZES.BODY,
  },
});
