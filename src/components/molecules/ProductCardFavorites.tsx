import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import FavoriteButton from "../atoms/FavoriteButton";
import ProductImage from "../atoms/ProductImage";

interface ProductCardProps {
    id: number;
    name: string;
    imageUrl: string | null;
    isFavorite?: boolean;
    onFavoritePress?: () => void;
}

export default function ProductCard({ id, name, imageUrl, isFavorite = false, onFavoritePress }: ProductCardProps) {
    return (
        <Pressable
            onPress={() => router.push(`/product/${id}` as any)}
            className="flex-1 m-1"
        >
            <View className="relative">
                <ProductImage source={{ uri: imageUrl ?? '' }} size="lg" />
                <View className="absolute bottom-0 right-0">
                    <FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress} />
                </View>
            </View>
            <Text className="text-sm text-gray-800 mt-2" numberOfLines={2}>
                {name}
            </Text>
            <View className="mt-1 h-px bg-[#33232C]" />
        </Pressable>
    );
}
