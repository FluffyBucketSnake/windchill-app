import React from "react";
import { registerRootComponent } from "expo";
import { MainScreen } from "./MainScreen";

function App() {
  return <MainScreen />;
}

export default registerRootComponent(App);
