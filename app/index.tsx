import React from "react";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "@/screens/HomeScreen";

const App: React.FC = () => (
  <NativeBaseProvider>
    <HomeScreen />
  </NativeBaseProvider>
);

export default App;
