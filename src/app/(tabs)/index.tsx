import BajaValleLogo from '@/assets/expo.icon/Assets/bajaValleLOGO.svg';
import Forms from '@/components/molecules/Forms';
import ProductOverview from '@/components/molecules/ProductOverview';
import { ImageBackground, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";

export default function HomeScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView className="flex-1 bg-[#F0EFDF]">

      <ImageBackground source={require('@/assets/images/home-header-image.png')} className="w-full h-[393px]" resizeMode="cover">
        <View className="flex-1 items-center justify-center">
          <BajaValleLogo width={280} height={156} color="white" />
        </View>
      </ImageBackground>
 
        <ProductOverview />
    
        <Forms />
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
