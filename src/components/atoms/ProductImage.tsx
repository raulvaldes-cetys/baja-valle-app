import { Image, ImageSourcePropType, View } from "react-native";

interface ProductImageProps {
  source: ImageSourcePropType;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "w-24 h-24",
  md: "w-40 h-40",
  lg: "w-full aspect-square",
};

export default function ProductImage({
  source,
  size = "md",
}: ProductImageProps) {
  return (
    <View className={`${SIZES[size]} rounded-xl overflow-hidden bg-gray-100`}>
      <Image
        source={source}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
}
