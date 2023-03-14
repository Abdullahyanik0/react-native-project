import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LoginScreen } from "./Login";
import { RegisterScreen } from "./Register";

export const ProfileScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { marginTop: 60, borderRadius: 10 },
      }}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
};
