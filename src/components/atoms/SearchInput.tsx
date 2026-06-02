import { Ionicons } from "@expo/vector-icons";
import { TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Buscar producto...",
  ...rest
}: SearchInputProps) {
  return (
    <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-4 py-2 flex-1">
      <Ionicons name="search-outline" size={18} color="#888" />
      <TextInput
        className="ml-2 flex-1 text-sm text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        {...rest}
      />
    </View>
  );
}
