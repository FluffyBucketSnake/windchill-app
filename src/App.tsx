import React from "react";
import { registerRootComponent } from "expo";
import { MainScreen } from "./screens/MainScreen";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import FluentUI from "./assets/fonts/fluentui/fluentui.ttf";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {
  const [areFontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    FluentUI,
  });

  if (!areFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainScreen />
    </GestureHandlerRootView>
  );
}

export default registerRootComponent(App);
