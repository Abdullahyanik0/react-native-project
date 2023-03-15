import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeScreen } from "@pages/Home";
import { ProfileScreen } from "@pages/auth/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "@pages/auth/Login";
import { RegisterScreen } from "@pages/auth/Register";

export const BottomBar = () => {
  const Tab = createBottomTabNavigator();

  const HomeStack = createStackNavigator();
  function ProfileStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Profiles" component={ProfileScreen} />
        <HomeStack.Screen name="Register" component={RegisterScreen} />
        <HomeStack.Screen name="Login" component={LoginScreen} />
      </HomeStack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: "red" }}
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#B94EEB", tabBarInactiveTintColor: "#989BA0" }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={color === "#B94EEB" ? "home" : "home-outline"} color={color} size={26} />,
          tabBarLabelStyle: { paddingBottom: 6, marginTop: -6 },
        }}
        component={HomeScreen}
        name="Home"
      ></Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={color === "#B94EEB" ? "account" : "account-outline"} color={color} size={26} />,
          tabBarLabelStyle: { paddingBottom: 6, marginTop: -6 },
        }}
        name="Profile"
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  );
};
