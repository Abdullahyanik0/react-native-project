import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Input, Button, Text, View, Pressable } from "native-base";
import { useState } from "react";
import CButton from "@components/atoms/CButton";

export const RegisterScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "https://social-blogs.cyclic.app/register";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
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
    <View style={{ flex: 1, justifyContent: "flex-start", marginHorizontal: 20, gap: 20 }}>
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
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input backgroundColor="white" rounded="lg" placeholder="Adınız" w="100%" onBlur={onBlur} onChangeText={onChange} value={value} />
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
          <Input backgroundColor="white" rounded="lg" placeholder="E-mail" w="100%" onBlur={onBlur} onChangeText={onChange} value={value} />
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
      {errors.password && <Text>This is password required.</Text>}

      <CButton onPress={handleSubmit(onSubmit)} text="Kayıt Ol" rounded="full" size="lg" color="purple" loading={loading} />
    </View>
  );
};
