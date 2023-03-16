import { Box, FormControl, Input, WarningOutlineIcon } from "native-base";
import React from "react";

const CInput = ({ placeholder, name, label, value, errors, onChangeText, onBlur }) => {
  return (
    <Box alignItems="center">
      <FormControl isInvalid  w="100%">
        <Box display="flex" justifyContent="space-between" flexDirection="row">
          <FormControl.Label>{label}</FormControl.Label>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>{errors}</FormControl.ErrorMessage>
        </Box>
        <Input
          onBlur={onBlur}
          onChangeText={onChangeText}
          rounded="xl"
          borderColor={errors ? "red.600" : "gray.300"}
          backgroundColor={errors ? "red.50" : "white"}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      </FormControl>
    </Box>
  );
};

export default CInput;
p