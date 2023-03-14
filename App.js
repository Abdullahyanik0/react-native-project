import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeBaseProvider, Input, Box, Button } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeScreen } from "@pages/Home";
import "react-native-gesture-handler";
import { ProfileScreen } from "@pages/auth/ProfileScreen";

function App() {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Tab.Navigator activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor: "red" }} screenOptions={{ headerShown: false }}>
            <Tab.Screen
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
              }}
              name="Home"
              component={HomeScreen}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
              }}
              name="Profile"
              component={ProfileScreen}
            />
          </Tab.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
