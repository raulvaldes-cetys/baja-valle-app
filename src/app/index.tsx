import { View } from 'react-native';
import { ThemedText } from '@/components/atoms/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useState } from 'react';
import HeaderWithImage from '@/components/molecules/HeaderWithImage';

const data = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
];

export default function HomeScreen() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View className="flex-1 bg-white">
      <HeaderWithImage title="BAJA VALLE" subtitle="TODO PARA VIÑEDOS" text="ENS / BC" backGroundImage={require('@/assets/images/home-header-image.png')} />
      <View className="flex-1 items-center justify-center">
        <ThemedText weight="bold" className="text-2xl font-bold text-black pb-6">Home</ThemedText>
        <Skeleton height={30} width={200} className="pb-8" />
      </View>
    </View>
  );
}
