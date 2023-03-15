import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Input, Text, View, Pressable, Center, Modal, FormControl, Checkbox } from "native-base";
import { useState } from "react";
import CButton from "@components/atoms/CButton";
import { Keyboard, RefreshControl } from "react-native";

export const RegisterScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [groupValues, setGroupValues] = useState([]);

  const url = "https://social-blogs.cyclic.app/register";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    Keyboard.dismiss();
    console.log(data);
    setLoading(true);
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Login");
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error?.message);
        setError(error?.message);
      });
    reset();
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", marginHorizontal: 20, gap: 15 }}>
      <View mb="4" mt="12">
        <Text fontSize="3xl">Tekrar Hoşgeldin,</Text>
        <Text color="gray.500" fontSize="lg">
          Seni tekrar görmek güzel
        </Text>
      </View>
      <View mb="-3" display="flex" flexDirection="row" justifyContent="space-between">
        <Text>Adınız</Text>
        {errors.name && (
          <Text mr={2} color="red.500">
            Zorunlu alan
          </Text>
        )}
        {error && (
          <Text mr={2} color="red.500">
            {error}
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
            borderColor={errors.name ? "red.600" : "gray.300"}
            backgroundColor={errors.name ? "red.50" : "white"}
            rounded="lg"
            placeholder="Adınız"
            w="100%"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      <View mb="-3" display="flex" flexDirection="row" justifyContent="space-between">
        <Text>E-mail</Text>
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
          <Input
            borderColor={errors.email ? "red.600" : "gray.300"}
            backgroundColor={errors.email ? "red.50" : "white"}
            rounded="lg"
            placeholder="E-mail"
            w="100%"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
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
            borderColor={errors.password ? "red.600" : "gray.300"}
            backgroundColor={errors.password ? "red.50" : "white"}
            rounded="lg"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            type={show ? "text" : "password"}
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
            placeholder="Şifre"
          />
        )}
        name="password"
      />
      <Checkbox colorScheme="purple" value="1" defaultIsChecked>
        <Text color="purple.800">Şartlar ve koşulları</Text>
        <Text>kabul ediyorum.</Text>
      </Checkbox>
      <Checkbox colorScheme="purple" value="2" defaultIsChecked>
        <Text color="purple.800">Ticari Şartları</Text>
        <Text>kabul ediyorum.</Text>
      </Checkbox>

      <CButton onPress={handleSubmit(onSubmit)} text="Kayıt Ol" rounded="full" size="lg" color="purple" loading={loading} />
    </View>
  );
};
