import GrapesVectorSvg from "@/assets/expo.icon/Assets/grapes-vector.svg";
import ProductCharacteristics from "@/components/molecules/ProductCharacteristics";
import ProductDescription from "@/components/molecules/ProductDescription";
import ProductHeader from "@/components/molecules/ProductHeader";
import ProductPrice from "@/components/molecules/ProductPrice";
import Quote from "@/components/molecules/Quote";
import { ProductByIdResponse } from "@/api/types/api-types";
import { ThemedText } from "@/components/atoms/ThemedText";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

interface ProductDetailScreenProps {
  product: ProductByIdResponse;
}

export default function ProductDetailScreen({ product }: ProductDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleAddToCart(quantity: number) {
    console.log(`Agregando ${quantity} x ${product.name} al carrito`);
  }

  return (
    <View className="flex-1 bg-[#4A1628]">
      <TouchableOpacity
        onPress={() => router.navigate('/(tabs)/products')}
        style={{ position: "absolute", top: 50, left: 16, zIndex: 10 }}
        className="bg-black/30 rounded-full p-2"
      >
        <ThemedText weight="bold" className="text-white text-xl px-1">←</ThemedText>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={true}
      >
        <ProductHeader imageUrl={product.imageUrl} name={product.name} />

        <View className="bg-white px-5 pt-10 pb-2" style={{ overflow: "hidden" }}>
          <View style={{ position: "absolute", right: 0, top: 100, opacity: 0.85 }}>
            <GrapesVectorSvg width={80} height={200} />
          </View>

          {product.description && (
            <ProductDescription
              description={product.description}
              isFavorite={isFavorite}
              onFavoritePress={() => setIsFavorite(!isFavorite)}
            />
          )}

          <View style={{ marginRight: 54 }}>
            {product.features && product.features.length > 0 && (
              <ProductCharacteristics characteristics={product.features} />
            )}

            {product.specifications && (
              <View className="mb-4">
                <ThemedText weight="bold" className="text-lg mb-2" style={{ color: "#33232C" }}>
                  Especificaciones
                </ThemedText>
                <ThemedText weight="regular" className="text-base leading-6" style={{ color: "#33232C" }}>
                  {product.specifications}
                </ThemedText>
              </View>
            )}

            <ProductPrice price={product.price} />
          </View>
        </View>

        <View className="flex-1">
          <Quote productName={product.name} onAddToCart={handleAddToCart} />
        </View>
      </ScrollView>
    </View>
  );
}
