import { ThemedText } from "../atoms/ThemedText";
import { ImageBackground, ImageSourcePropType, View } from "react-native";
import BajaValleLogo from "@/assets/images/baja-valle-logo.svg";
import React from "react";

interface headerWithImageProps {
  title: string;
  subtitle?: string;
  text?: string;
  backGroundImage: ImageSourcePropType;
  withLogo?: boolean;
}

export default function HeaderWithImage({ title, subtitle, text, backGroundImage, withLogo = true }: headerWithImageProps) {
  return (
    <View className="flex items-center gap-4" >
      <ImageBackground source={backGroundImage} className="w-full h-[393px]" resizeMode="cover">
        <View className="flex items-center justify-center mt-20">
          {withLogo && <BajaValleLogo width={100} height={107} />}
          <ThemedText weight="bold" className="text-5xl font-bold text-center text-[#F0EFDF] pb-4">{title}</ThemedText>
          {subtitle && <ThemedText weight="light" className="text-xl text-center text-[#F0EFDF] pb-2">{subtitle}</ThemedText>}
          {text && <ThemedText weight="light" className="text-xs text-center text-[#F0EFDF]">{text}</ThemedText>}
        </View>
      </ImageBackground>
    </View>
  );
}