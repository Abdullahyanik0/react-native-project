import { Box, Center, HStack, Icon, Pressable, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";

export const Footer = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const handleNavigate = (navigate) => {
    setSelected(navigate);
    navigation.navigate(navigate);
  };
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const user = !keyboardVisible ? true : false;
  return (
    user && (
      <HStack bg="white" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable cursor="pointer" opacity={selected === "Home" ? 1 : 0.5} flex={1} onPress={() => handleNavigate("Home")}>
          <Center>
            <Icon as={<MaterialCommunityIcons name={selected === "Home" ? "home" : "home-outline"} />} color="black" size="lg" />
            <Text color="black" fontSize="11">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === "Login" || selected === "Register" ? 1 : 0.5} py="1" flex={1} onPress={() => handleNavigate("Profile")}>
          <Center>
            <Icon as={<MaterialCommunityIcons name={selected === "Login" || selected === "Register" ? "account" : "account-outline"} />} color="black" size="lg" />
            <Text color="black" fontSize="11">
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>
    )
  );
};
