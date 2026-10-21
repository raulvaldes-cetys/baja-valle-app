import BajaValleLogo from '@/assets/expo.icon/Assets/bajaValleLOGO.svg';
import Forms from '@/components/molecules/Forms';
import ProductOverview from '@/components/molecules/ProductOverview';
import { ThemedButton } from '@/components/atoms/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { ImageBackground, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";

export default function HomeScreen() {
  const { user, isLoading } = useAuth();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView className="flex-1 bg-[#F0EFDF]">

      <ImageBackground source={require('@/assets/images/home-header-image.png')} className="w-full h-[393px]" resizeMode="cover">
        <View className="flex-1 items-center justify-center">
          <BajaValleLogo width={280} height={156} color="white" />
        </View>
        {!user && !isLoading && (
          <View className="items-center pb-8">
            <ThemedButton variant="pill" className="px-8" onPress={() => router.push('/login')}>
              INICIAR SESIÓN / CREAR CUENTA
            </ThemedButton>
          </View>
        )}
      </ImageBackground>
 
        <ProductOverview />
    
        <Forms />
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
