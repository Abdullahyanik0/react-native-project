import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "@pages/auth/Login";
import { ProfileScreen } from "@pages/auth/ProfileScreen";
import { RegisterScreen } from "@pages/auth/Register";
import { HomeScreen } from "@pages/Home";

export const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
