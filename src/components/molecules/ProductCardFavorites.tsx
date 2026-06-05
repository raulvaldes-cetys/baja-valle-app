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
            <ProductImage source={{ uri: imageUrl ?? '' }} size="lg" />
            <View className="flex-row items-center justify-between mt-2">
                <Text className="text-sm text-gray-800 flex-1" numberOfLines={2}>
                    {name}
                </Text>
                <FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress} />
            </View>
            <View className="mt-1 h-px bg-[#33232C]" />
        </Pressable>
    );
}
