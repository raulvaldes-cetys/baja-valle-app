import GrapesVector from "@/assets/expo.icon/Assets/grapes-vector.svg";
import ProductCharacteristics from "@/components/molecules/ProductCharacteristics";
import ProductDescription from "@/components/molecules/ProductDescription";
import ProductHeader from "@/components/molecules/ProductHeader";
import ProductPrice from "@/components/molecules/ProductPrice";
import Quote from "@/components/molecules/Quote";
import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

interface ProductDetailScreenProps {
  product: Product;
}

export default function ProductDetailScreen({
  product,
}: ProductDetailScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleAddToCart(quantity: number) {
    console.log(`Agregando ${quantity} x ${product.name} al carrito`);
  }

  return (
    <View className="flex-1 bg-[#4A1628]">
      {/* boton regresar */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 50, left: 16, zIndex: 10 }}
        className="bg-black/30 rounded-full p-2"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={true}
      >
        {/* Imagen + logo + nombre */}
        <ProductHeader image={product.image} name={product.name} />

        <View className="bg-white px-5 pt-10 pb-32">
          <View style={{ position: "absolute", right: -50, bottom: 40, opacity: 0.85 }}>
            <GrapesVector width={160} height={160} fill="#854F0B" />
          </View>
          <ProductDescription
            description={product.description ?? "Sin descripción disponible."}
            isFavorite={isFavorite}
            onFavoritePress={() => setIsFavorite(!isFavorite)}
          />
          <ProductCharacteristics
            characteristics={product.characteristics ?? ["Sin características disponibles."]} />
          
          <ProductPrice price={product.price} />
        </View>

        {/* cotizacion */}
        <View className="flex-1">
          <Quote
            productName={product.name}
            onAddToCart={handleAddToCart}
          />
        </View>
      </ScrollView>
    </View>
  );
}