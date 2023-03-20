import { Text, View, Checkbox, Button, Input, Pressable, Icon, FormControl, Box, WarningOutlineIcon } from "native-base";
import { useState } from "react";
import CButton from "@components/atoms/CButton";
import { useFormik } from "formik";
import CInput from "@components/atoms/CInput";
import * as Yup from "yup";
import { Keyboard } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const url = "https://social-blogs.cyclic.app/register";

export const RegisterScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { handleChange, handleSubmit, handleBlur, values, errors, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
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
          console.log(response.data);
      /*     navigation.navigate("Login", { user: values }); */
          setLoading(false);
          resetForm();
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error?.message);
          setError(error?.message);
        });
    },
  });
  const { name, email, password } = values;
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={{ flex: 1, justifyContent: "flex-start", marginHorizontal: 20, gap: 15 }} mb={4}>
        <View mb="4" mt="12">
          <Text fontSize="3xl">Tekrar Hoşgeldin,</Text>
          <Text color="gray.500" fontSize="lg">
            Seni tekrar görmek güzel
          </Text>
        </View>
        <View mb={-10} mr={2} display="flex" flexDirection="row" justifyContent="flex-end">
          {error === "Request failed with status code 417" ? (
            <Text color="red.600">{!errors.name && "Kullanıcı Zaten Kayıtlı."}</Text>
          ) : (
            <Text color="red.600">{!errors.name && error}</Text>
          )}
        </View>
        <CInput name="name" placeholder="İsim giriniz." label="İsim" onChangeText={handleChange("name")} value={name} errors={errors.name} />
        <CInput name="email" placeholder="E-posta giriniz." label="E-posta" onChangeText={handleChange("email")} value={email} errors={errors.email} />
        <FormControl isInvalid={errors.password} w="100%">
          <Box display="flex" justifyContent="space-between" flexDirection="row">
            <FormControl.Label>Password</FormControl.Label>
            {errors.password && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>{errors.password}</FormControl.ErrorMessage>}
          </Box>
          <Input
            borderColor={errors.password ? "red.600" : "gray.300"}
            backgroundColor={errors.password ? "red.50" : "white"}
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

        <Checkbox colorScheme="purple" value="1" defaultIsChecked>
          <Text color="purple.800">Şartlar ve koşulları</Text>
          <Text>kabul ediyorum.</Text>
        </Checkbox>
        <Checkbox colorScheme="purple" value="2" defaultIsChecked>
          <Text color="purple.800">Ticari Şartları</Text>
          <Text>kabul ediyorum.</Text>
        </Checkbox>

        <CButton onPress={handleSubmit} text="Kayıt Ol" rounded="full" size="lg" color="purple" loading={loading} />
        <View display="flex" flexDirection="row" gap="2">
          <Text>Hesabın var mı ?</Text>
          <Text  color="purple.600">
            Giriş Yap
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
