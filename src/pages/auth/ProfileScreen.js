import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "native-base";
import { LoginScreen } from "./Login";
import { RegisterScreen } from "./Register";

export const ProfileScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  const control = true;

  return control ? (
    <Tab.Navigator
      initialRouteName="Giriş Yap"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#F2F2F3",
          marginTop: 60,
          borderRadius: 10,
          marginHorizontal: 10,
        },
        tabBarLabelStyle: { fontSize: 15, fontWeight: 500 },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#BDCDD6",
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },
        tabBarItemStyle: { backgroundColor: "white", margin: 5, borderRadius: 12 },
        tabBarPressColor: "transparent",
      }}
    >
      <Tab.Screen name="Giriş Yap" component={LoginScreen} />
      <Tab.Screen name="Kayıt Ol" component={RegisterScreen} />
    </Tab.Navigator>
  ) : (
    <View>
      <Text>asd</Text>
    </View>
  );
};
