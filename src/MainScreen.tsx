import React, { useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { TextBox } from "./TextBox";
import { THEME } from "./theme";
import { Button, ButtonVariant } from "./Button";
import { IconButton } from "./IconButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const optionsSnapPoints = [224];

export const MainScreen: React.FC = () => {
  const optionsModal = useRef<BottomSheet>(null);
  const openOptions = useCallback(
    () => optionsModal.current?.snapToIndex(0),
    []
  );
  return (
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
      <TextBox
        icon="temperature_regular"
        label="Actual temperature"
        suffix="ºC"
      />
      <TextBox
        icon="weather_squalls_regular"
        label="Wind speed"
        suffix="km/h"
      />
    </View>
    <View style={styles.footer}>
      <Button style={styles.btnCalculate}>Calculate</Button>
        <IconButton icon="options_filled" onPress={openOptions} />
    </View>
      <BottomSheet
        backgroundStyle={styles.optionsBackground}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.optionsHandleIndicator}
        index={-1}
        ref={optionsModal}
        snapPoints={optionsSnapPoints}
      >
        <Text>T</Text>
      </BottomSheet>
  </SafeAreaView>
);
};

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
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  headline: {
    color: THEME.COLORS.FOREGROUND,
    fontFamily: THEME.FONTS.LIGHT,
    ...THEME.FONT_SIZES.HEADLINE,
    marginBottom: 8,
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
  optionsBackground: {
    backgroundColor: THEME.COLORS.BACKGROUND_ALT,
  },
  optionsHandleIndicator: {
    backgroundColor: THEME.COLORS.FOREGROUND_ALT,
  },
});
