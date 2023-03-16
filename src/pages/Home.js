import { Button, Text, View, VStack, Box, Divider, AspectRatio, Center, Stack, Heading, HStack, Image, ScrollView, Skeleton, Badge, Spacer, Pressable, Flex } from "native-base";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState();

  const getData = () => {
    setLoading(true);
    axios.get("https://random-data-api.com/api/v2/users?size=4&is_xml=true").then((response) => {
      setData(response.data);
      setLoading(false);
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, [refreshing]);

  const Skeletons = () => {
    return (
      <Center w="100%" mt={10}>
        <VStack w="90%" maxW="400" borderWidth="1" space={12} overflow="hidden" rounded="md">
          <Skeleton h="40" startColor="gray.300" />
          <Skeleton.Text px="4" startColor="gray.400" />
          <Skeleton px="4" my="4" rounded="md" startColor="gray.500" />
        </VStack>
      </Center>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleDetail = (item) => {
    navigation.navigate("Detail", { item: item });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {loading ? (
        <>
          <Skeletons />
          <Skeletons />
          <Skeletons />
        </>
      ) : (
        <View backgroundColor="white">
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} w="100%" style={{ gap: 20 }} px={3}>
            {data?.map((item, i) => (
              <Pressable key={i} onPress={() => handleDetail(item)}>
                <Box key={item?.uid} alignItems="center" mt={8}>
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
                          {item?.employment?.title}
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
                          The {item?.first_name} Valley of {item?.last_name}.
                        </Text>
                      </Stack>
                      <Text fontWeight="400">
                        Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.
                      </Text>
                      <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: "warmGray.200",
                            }}
                            fontWeight="400"
                          >
                            {item?.date_of_birth} 6 mins ago
                          </Text>
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
