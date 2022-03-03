import React, { useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { THEME } from "./theme";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { ListNumericTextBox } from "./ListNumericTextBox";

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
          Calculate the perceived temperature by providing the actual
          temperature and the wind speed
        </Text>
      </View>
      <View>
        <ListNumericTextBox
          icon="temperature_regular"
          label="Actual temperature"
          suffix="ºC"
        />
        <ListNumericTextBox
          icon="top_speed_regular"
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
    alignItems: "center",
    backgroundColor: THEME.COLORS.BACKGROUND,
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 64,
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
