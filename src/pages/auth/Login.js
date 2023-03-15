import { Checkbox, Modal, Pressable, Text, View } from "native-base";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Input, Center } from "native-base";
import { useState } from "react";
import CButton from "@components/atoms/CButton";
import { Keyboard } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const url = "https://social-blogs.cyclic.app/login";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    Keyboard.dismiss();
    setLoading(true);
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        reset();
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch(function (error) {
        setLoading(false);
        setError(error?.message);
        console.log(error?.message);
      });
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "flex-start", marginHorizontal: 20, gap: 15 }}>
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
              borderColor={errors.password ? "red.600" : "gray.300"}
              backgroundColor={errors.password ? "red.50" : "white"}
              placeholder="E-mail"
              w="100%"
              rounded="xl"
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

        <View display="flex" flexDirection="row" justifyContent="space-between">
          <Checkbox colorScheme="purple" color="purple.800" value="2" defaultIsChecked>
            <Text>Beni hatırla.</Text>
          </Checkbox>
          <Text onPress={() => setShowModal(true)} underline color="gray.500">
            Parolamı unuttum
          </Text>
        </View>
        <CButton onPress={handleSubmit(onSubmit)} text="Giriş Yap" rounded="full" size="lg" color="purple" loading={loading} />
      </View>
      {showModal && (
        <Center>
          <CButton onPress={handleSubmit(onSubmit)} text="Kayıt Ol" rounded="full" size="lg" color="purple" loading={loading} />
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content minWidth="350px">
              <Modal.CloseButton />
              <Modal.Header>Parolanızı mı unuttunuz?</Modal.Header>
              <Modal.Body display="flex" flexDirection="column" justifyContent="center" gap={4}>
                <Text>E-posta adresinizi giri</Text>
                <Input placeholder="Password" w="100%" rounded="xl" />
                <CButton onPress={handleSubmit(onSubmit)} text="Gönder" rounded="full" size="lg" color="purple" loading={loading} />
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </Center>
      )}
    </>
  );
};
