import { ThemedText } from "./ThemedText";

interface SectionTitleProps {
  children: string;
  
  className?: string;
  
}


export default function SectionTitle({
  children,
  
  className = "",
}: SectionTitleProps) {
  return (
    <ThemedText
    weight="bold"
    className={`font-bold uppercase tracking-wide ${className}`}
    style={{ color: "#33232C" }}
      
    >
      {children}
    </ThemedText>
  );
}
