import React, { useState } from "react";
import { Text, View } from "native-base";
import CButton from "@components/atoms/CButton";
import { LoginScreen } from "./Login";
import { RegisterScreen } from "./Register";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = () => {
  const [tabs, setTabs] = useState("Login");
  const handleTabs = (tab) => {
    setTabs(tab);
  };
  return (
    <View display="flex" flexDirection="column" alignItems="center">
      <View backgroundColor="white" w="50%" display="flex" flexDirection="row" justifyContent="space-between">
        <CButton color="red" text="Login" flex={1} onPress={() => handleTabs("Login")} />
        <CButton color="red" text="Register" flex={1} onPress={() => handleTabs("Register")} />
      </View>
      {tabs === "Login" ? <LoginScreen /> : tabs === "Register" ? <RegisterScreen /> : ""}
    </View>
  );
};
