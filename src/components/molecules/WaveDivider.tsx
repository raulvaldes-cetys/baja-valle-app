import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface WaveDividerProps {
  color?: string;
  variant?: "top" | "bottom";
}

export default function WaveDivider({
  color = "#99884C",
  variant = "top",
}: WaveDividerProps) {
  const isTop = variant === "top";

  return (
    <View className={isTop ? "-mb-1" : "-mt-1"}>
      <Svg
        width="100%"
        height="70"
        viewBox="0 0 390 70"
        preserveAspectRatio="none"
      >
        {isTop ? (
          <Path
            d="M0,35 C120,0 270,80 390,35 L390,70 L0,70 Z"
            fill={color}
          />
        ) : (
          <Path
            d="M0,35 C120,80 270,0 390,35 L390,0 L0,0 Z"
            fill={color}
          />
        )}
      </Svg>
    </View>
  );
}