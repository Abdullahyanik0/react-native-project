import { Pressable, Text, View } from "native-base";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Input, Button } from "native-base";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegisterScreen } from "./Register";
import CButton from "@components/atoms/CButton";

export const LoginScreen = ({ navigation }) => {
  const Stack = createStackNavigator();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "https://social-blogs.cyclic.app/register";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error?.message);
      });
  };

  const handleClick = () => setShow(!show);
  return (
    <>
      <View style={{ flex: 1, justifyContent: "flex-start", marginHorizontal: 20, gap: 20 }}>
        <View mb="4" mt="12">
          <Text fontSize="3xl">Tekrar Hoşgeldin,</Text>
          <Text color="gray.500" fontSize="lg">
            Seni tekrar görmek güzel
          </Text>
        </View>
        <View mb="-3" display="flex" flexDirection="row" justifyContent="space-between">
          <Text>E-posta</Text>
          {errors.email && (
            <Text mr={2} color="red.500">
              Zorunlu alan
            </Text>
          )}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input backgroundColor="white" placeholder="E-mail" w="100%" rounded="xl" onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name="email"
        />

        <View mb="-3" display="flex" flexDirection="row" justifyContent="space-between">
          <Text>Şifre</Text>
          {errors.password && (
            <Text mr={2} color="red.500">
              Zorunlu alan
            </Text>
          )}
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              backgroundColor="white"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              type={show ? "text" : "password"}
              rounded="xl"
              w="100%"
              py="2"
              control={control}
              rules={{
                required: true,
              }}
              InputRightElement={
                <Pressable pr="2" onPress={() => setShow(!show)}>
                  <Icon name={show ? "eye-off" : "eye"} size={25} />
                </Pressable>
              }
              placeholder="Password"
            />
          )}
          name="password"
        />

        <View mt={-3} display="flex" flexDirection="row" justifyContent="flex-end">
          <Text underline color="gray.500">
            Parolamı unuttum
          </Text>
        </View>
        <CButton onPress={handleSubmit(onSubmit)} text="Giriş Yap" rounded="full" size="lg" color="purple" loading={loading} />
      </View>
    </>
  );
};
