import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black dark:text-white">Explore</Text>
      </View>
    </SafeAreaView>
  );
}
