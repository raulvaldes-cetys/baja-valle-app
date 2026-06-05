import { ThemedText } from "@/components/atoms/ThemedText";

interface PriceTextProps {
  price?: number;
  className?: string;
}

export default function PriceText({ price, className = "" }: PriceTextProps) {
  const parsed = Number(price);
  const formatted = !isNaN(parsed) && parsed > 0
    ? `$ ${parsed.toFixed(2)} MXN`
    : "$ 000.00 MXN";

  return (
    <ThemedText weight="regular" className={`text-base ${className}`} style={{ color: "#33232C" }}>
      {formatted}
    </ThemedText>
  );
}