import { Button, Text, View, VStack, Box, Divider, AspectRatio, Center, Stack, Heading, HStack, Image, ScrollView } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View backgroundColor="white">
        <ScrollView w="100%" style={{ gap: 20 }} px={3}>
          <Box alignItems="center" mb={16} mt={16}>
            <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="violet.500"
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5"
                >
                  PHOTOS
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    The Garden City
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    The Silicon Valley of India.
                  </Text>
                </Stack>
                <Text fontWeight="400">Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.</Text>
                <HStack alignItems="center" space={4} justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="400"
                    >
                      6 mins ago
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        </ScrollView>
      </View>
    </View>
  );
};
