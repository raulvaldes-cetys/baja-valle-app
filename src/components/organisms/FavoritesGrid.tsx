import { FlatList, View } from "react-native";
import { ProductsListItem } from "../../api/types/api-types";
import ProductCardFavorites from "../molecules/ProductCardFavorites";

interface FavoritesGridProps {
    products: ProductsListItem[];
    onFavoritePress: (id: number) => void;
}

export default function FavoritesGrid({ products, onFavoritePress }: FavoritesGridProps) {
    return (
        <View className="px-4 mb-6">
            {/* <SectionTitle className="text-2xl text-center text-[#7B2D2D] mb-4 px-4">
                {title}
            </SectionTitle> */}
            <FlatList
                data={products.length % 2 !== 0 ? [...products, null] : products}
                numColumns={2}
                scrollEnabled={false}
                keyExtractor={(item, index) => item ? String(item.id) : `spacer-${index}`}
                columnWrapperClassName="gap-2 mt-3"
                renderItem={({ item }) =>
                    item ? (
                        <ProductCardFavorites
                            id={item.id}
                            name={item.name}
                            imageUrl={item.imageUrl}
                            isFavorite={true}
                            onFavoritePress={() => onFavoritePress(item.id)}
                        />
                    ) : (
                        <View className="flex-1 m-1" />
                    )
                }
            />
        </View>
    );
}