import React from "react";
import { registerRootComponent } from "expo";
import { MainScreen } from "./MainScreen";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

function App() {
  const [areFontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!areFontsLoaded) {
    return <AppLoading />;
  }

  return <MainScreen />;
}

export default registerRootComponent(App);
