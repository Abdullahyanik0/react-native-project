import { Text, View, Checkbox, Button, Input, Pressable, Icon, FormControl, Box, WarningOutlineIcon, Modal, Center, Actionsheet } from "native-base";
import axios from "axios";
import { useEffect, useState } from "react";
import CButton from "@components/atoms/CButton";
import { Keyboard } from "react-native";
import { useFormik } from "formik";
import CInput from "@components/atoms/CInput";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const LoginScreen = ({ route, navigation }) => {
  console.log(navigation);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const url = "https://social-blogs.cyclic.app/login";

  const { handleChange, handleSubmit, handleBlur, values, errors, setFieldValue, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    }),
    onSubmit: (values) => {
      Keyboard.dismiss();
      console.log(values);
      setLoading(true);
      axios
        .post(url, values)
        .then((response) => {
          navigation.navigate("Home", { user: values });
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error?.message);
          setError(error?.message);
        });
    },
  });
  const { email, password } = values;

  const userEmail = route?.params?.user?.email;
  const userPassword = route?.params?.user?.password;

  useEffect(() => {
    setFieldValue("email", userEmail);
    setFieldValue("password", userPassword);
  }, []);

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <View style={{ flex: 1, justifyContent: "flex-start", marginHorizontal: 20, gap: 15 }}>
          <View mb="4" mt="12">
            <Text fontSize="3xl">Tekrar Hoşgeldin,</Text>
            <Text color="gray.500" fontSize="lg">
              Seni tekrar görmek güzel
            </Text>
          </View>
          <CInput
            touched={touched.email}
            onBlur={handleBlur("email")}
            name="email"
            placeholder="E-posta giriniz."
            label="E-posta"
            onChangeText={handleChange("email")}
            value={email}
            errors={errors.email}
          />
          <FormControl isInvalid={errors.password && touched.password} w="100%">
            <Box display="flex" justifyContent="space-between" flexDirection="row">
              <FormControl.Label>Password</FormControl.Label>
              {errors.password && touched.password && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>{errors.password}</FormControl.ErrorMessage>}
            </Box>
            <Input
              borderColor={errors.password && touched.password ? "red.600" : "gray.300"}
              backgroundColor={errors.password && touched.password ? "red.50" : "white"}
              rounded="lg"
              onChangeText={handleChange("password")}
              value={password}
              type={show ? "text" : "password"}
              w="100%"
              py="2"
              InputRightElement={
                <Pressable pr="2" onPress={() => setShow(!show)}>
                  <Icon name={show ? "eye-off" : "eye"} size={25} />
                </Pressable>
              }
              placeholder="Şifre"
            />
          </FormControl>

          <View display="flex" flexDirection="row" justifyContent="space-between">
            <Checkbox colorScheme="purple" color="purple.800" value="2" defaultIsChecked>
              <Text>Beni hatırla.</Text>
            </Checkbox>
            <Text onPress={() => setShowModal(true)} underline color="gray.500">
              Parolamı unuttum
            </Text>
          </View>
          <CButton onPress={handleSubmit} text="Giriş Yap" rounded="full" size="lg" color="purple" loading={loading} />
          <View display="flex" flexDirection="row" gap="2">
            <Text>Hesabın yok mu ?</Text>
            <Text onPress={() => navigation.navigate("Register")} color="purple.600">
              Kaydol
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {showModal && (
        <Actionsheet isOpen={showModal} onClose={setShowModal}>
          <Actionsheet.Content>
            <View width="100%">
              <Text textAlign="center" fontSize={16}>
                Parolanızı mı unuttunuz?
              </Text>
            </View>
          </Actionsheet.Content>
          <Actionsheet.Item>
            <View width="100%" minW="100%" mb={4}>
              <Text m={2}>E-posta adresinizi girin</Text>
              <Input mb={8} placeholder="Password" w="100%" rounded="xl" />
              <CButton onPress={handleSubmit} text="Gönder" rounded="full" size="lg" color="purple" loading={loading} />
            </View>
          </Actionsheet.Item>
          <Actionsheet.Item></Actionsheet.Item>
        </Actionsheet>
      )}
    </>
  );
};
