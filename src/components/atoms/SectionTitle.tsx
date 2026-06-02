import { Text } from "react-native";

interface SectionTitleProps {
  children: string;
  
  className?: string;
  
}


export default function SectionTitle({
  children,
  
  className = "",
}: SectionTitleProps) {
  return (
    <Text
      className={`font-bold uppercase tracking-wide text-[px15] text-[#7B2D2D]  ${className}`}
      
    >
      {children}
    </Text>
  );
}
