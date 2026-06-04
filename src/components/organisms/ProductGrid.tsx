import { FlatList, View } from "react-native";
import { ProductsListItem } from "../../api/types/api-types";
import SectionTitle from "../atoms/SectionTitle";
import ProductCard from "../molecules/ProductCard";

interface ProductGridProps {
  title: string;
  products: ProductsListItem[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <View className="px-4 mb-6">
      <SectionTitle className="text-2xl text-center text-[#7B2D2D] mb-4 px-4">
        {title}
      </SectionTitle>
      <FlatList
        data={products.length % 2 !== 0 ? [...products, null] : products}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item, index) => item ? String(item.id) : `spacer-${index}`}
        columnWrapperClassName="gap-2 mt-3"
        renderItem={({ item }) =>
          item ? (
            <ProductCard id={item.id} name={item.name} imageUrl={item.imageUrl} />
          ) : (
            <View className="flex-1 m-1" />
          )
        }
      />
    </View>
  );
}
