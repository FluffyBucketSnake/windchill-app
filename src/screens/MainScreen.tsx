import React, { useCallback, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
import { THEME } from "../theme";
import { Button, ButtonVariant } from "../components/Button";
import { IconButton } from "../components/IconButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ListNumericTextBox } from "../components/ListNumericTextBox";
import { ListComboBox } from "../components/ListComboBox";
import { BlurView } from "expo-blur";

const optionsSnapPoints = [224];

export const MainScreen: React.FC = () => {
  const optionsModal = useRef<BottomSheet>(null);
  const openOptions = useCallback(
    () => optionsModal.current?.snapToIndex(0),
    []
  );
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
        <View>
          <ListNumericTextBox
            icon="temperature_regular"
            labelText="Actual temperature"
            suffix="ºC"
          />
          <ListNumericTextBox
            icon="weather_squalls_regular"
            labelText="Wind speed"
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
          <BottomSheetView style={styles.optionsView}>
            <View style={styles.optionsList}>
              <Text style={styles.title}>Units</Text>
              <ListComboBox
                icon="temperature_regular"
                labelText="Temperature"
                modalTitle="Select the desired unit"
                options={[
                  { id: 0, name: "Celsius(ºC)" },
                  { id: 1, name: "Fahrenheit(ºF)" },
                ]}
                value={0}
              />
              <ListComboBox
                icon="top_speed_regular"
                labelText="Speed"
                modalTitle="Select the desired unit"
                options={[
                  { id: 0, name: "Metric(km/h)" },
                  { id: 1, name: "Imperial(mph)" },
                ]}
                value={0}
              />
            </View>
            <View style={styles.optionsFooter}>
              <Button style={styles.optionsSave}>Save</Button>
              <Button variant={ButtonVariant.Secondary}>Reset</Button>
            </View>
          </BottomSheetView>
        </BottomSheet>
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
    alignItems: "center",
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
  optionsView: {
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
  optionsFooter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
  },
  optionsSave: {
    flex: 1,
    marginRight: 8,
  },
});
