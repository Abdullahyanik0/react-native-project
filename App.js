import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Routes } from "@pages/Routes";
import { Footer } from "@components/organism/Footer";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Routes />
          <Footer />
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
