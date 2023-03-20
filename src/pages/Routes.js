import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "@pages/auth/Login";
import { ProfileScreen } from "@pages/auth/ProfileScreen";
import { RegisterScreen } from "@pages/auth/Register";
import { HomeScreen } from "@pages/Home";
import { DetailScreen } from "@pages/DetailScreen";

export const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === "Login" || route.name === "Register" ? false : true,
      })}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
