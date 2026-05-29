import BajaValleLogo from "@/assets/expo.icon/Assets/bajaValleLOGO.svg";
import CartButton from "@/components/atoms/Cart";
import SearchInput from "@/components/atoms/SearchInput";
import CategoryNav from "@/components/organisms/CategoryNav";
import ProductGrid from "@/components/organisms/ProductGrid";
import { CATEGORIES, CategoryId } from "@/constants/categories";
import { MOCK_PRODUCTS } from "@/constants/mockProducts";
import { Product } from "@/types/product";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("vinicolas");
  const [search, setSearch] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.categoryId === activeCategory &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "";

  function handleProductPress(product: Product) {
    console.log("producto seleccionado:", product.name);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0E8]">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* header */}
        <View className="items-center pt-4 pb-2">
          <BajaValleLogo width={200} height={150} />
          
        </View>

        {/* titulo de seccion*/}
        <Text className="text-center text-[30px] font-bold tracking-widest text-[#7B2D2D] px-4 mt-1 mb-3">
          NUESTROS PRODUCTOS
        </Text>

        {/* searchbar */}
        <View className="flex-row items-center px-4 gap-2 mb-2">
          <SearchInput
            placeholder="Gotera para planta"
            value={search}
            onChangeText={setSearch}
          />
          <CartButton count={0} />
        </View>

        {/* categorias */}
        <CategoryNav onCategoryChange={setActiveCategory} />

        {/* productos */}
        <View className="mt-2">
          <ProductGrid
            title={activeLabel}
            products={filteredProducts}
            onProductPress={handleProductPress}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
