import { Link } from "expo-router";
import { Host, Text, VStack } from "@expo/ui/swift-ui";
import { useWindowDimensions } from "react-native";

export default function Index() {
    const { width } = useWindowDimensions();
  return (
    <Host style={{ position: 'absolute', width }}>
    <VStack>
      <Text>Hello World</Text>
    </VStack>
    </Host>
  );
}