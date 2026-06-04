import BajaValleLogo from "@/assets/images/baja-valle-logo.svg";
import { ThemedText } from "@/components/atoms/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, ImageSourcePropType, View } from "react-native";

interface ProductHeaderProps {
  image: ImageSourcePropType;
  name: string;
}

export default function ProductHeader({
  image,
  name,
}: ProductHeaderProps) {
  return (
    <ImageBackground
      source={image}
      className="w-full h-80"
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)"]}
        locations={[0, 0.5, 1]}
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <View className="items-center pt-20">
          <BajaValleLogo width={125} height={100} />
        </View>
        <View className="items-center pb-16 px-6">
          <ThemedText weight="bold" className="text-white text-3xl text-center px-16">
            {name.toUpperCase()}
          </ThemedText>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}