import { Button, Text, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",

        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button onPress={() => navigation.navigate("Profile")} small primary>
          Go To Home
        </Button>
      </View>
    </View>
  );
};
