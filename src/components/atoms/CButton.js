import React from "react";
import { Button, Spinner } from "native-base";

const CButton = ({ size, text, color, onPress, rounded, leftIcon, loading }) => {
  return (
    <Button size={size || "sm"} colorScheme={color} onPress={onPress} rounded={rounded} leftIcon={leftIcon}>
      {loading ? <Spinner py="1" color="warning.600" accessibilityLabel="Loading posts" /> : text}
    </Button>
  );
};

export default CButton;
