import { Text } from "react-native";

interface PriceTextProps {
  price?: number;
  className?: string;
}

export default function PriceText({ price, className = "" }: PriceTextProps) {
  const formatted = price
    ? `$ ${price.toFixed(2)} MXN`
    : "$ 000.00 MXN";

  return (
    <Text className={`text-base text-gray-800 ${className}`}>
      {formatted}
    </Text>
  );
}
