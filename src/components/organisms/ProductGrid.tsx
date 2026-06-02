import { FlatList, View } from "react-native";
import { Product } from "../../types/product";
import SectionTitle from "../atoms/SectionTitle";
import ProductCard from "../molecules/ProductCard";

interface ProductGridProps {
  title: string;
  products: Product[];
  onProductPress?: (product: Product) => void;
}

export default function ProductGrid({
  title,
  products,
  onProductPress,
}: ProductGridProps) {
  return (
    <View className="px-4 mb-6">
    <SectionTitle className="text-2xl text-center text-[#7B2D2D] mb-4 px-4 ">{title}</SectionTitle>      
    <FlatList
        data={products}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        columnWrapperClassName="gap-2 mt-3"
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            image={item.image}
            onPress={() => onProductPress?.(item)}
          />
        )}
      />
    </View>
  );
}
