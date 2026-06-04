import Forms from '@/components/molecules/Forms';
import HeaderWithImage from '@/components/molecules/HeaderWithImage';
import ProductOverview from '@/components/molecules/ProductOverview';
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";

const data = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
];

export default function HomeScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <ScrollView className="flex-1 bg-[#F0EFDF]">
    
      <HeaderWithImage title="BAJA VALLE" subtitle="TODO PARA VIÑEDOS" text="ENS / BC" backGroundImage={require('@/assets/images/home-header-image.png')} />
 
        <ProductOverview />
    
        <Forms />
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}
