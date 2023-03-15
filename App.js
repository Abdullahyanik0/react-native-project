import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { BottomBar } from "@components/organism/BottomBar";
import { Routes } from "@pages/Routes";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <BottomBar />
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
