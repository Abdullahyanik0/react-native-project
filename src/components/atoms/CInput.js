import { Box, FormControl, Input, WarningOutlineIcon } from "native-base";
import React from "react";

const CInput = ({ placeholder, name, label, value, errors, onChangeText, onBlur, touched }) => {
  return (
    <Box alignItems="center">
      <FormControl isInvalid={errors && touched} w="100%">
        <Box display="flex" justifyContent="space-between" flexDirection="row">
          <FormControl.Label>{label}</FormControl.Label>
          {errors && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>{touched && errors}</FormControl.ErrorMessage>}
        </Box>
        <Input
          onBlur={onBlur}
          onChangeText={onChangeText}
          rounded="xl"
          borderColor={errors && touched ? "red.600" : "gray.300"}
          backgroundColor={errors && touched ? "red.50" : "white"}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      </FormControl>
    </Box>
  );
};

export default CInput;
