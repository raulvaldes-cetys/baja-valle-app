import { router } from "expo-router";
import { View } from "react-native";
import { CATEGORIES } from "@/constants/categories";
import { useGetCategoriesList } from "@/services/queries/use-get-categories-list";
import { Skeleton } from "../atoms/Skeleton";
import { ThemedText } from "../atoms/ThemedText";
import { IconWithText } from "./IconWithText";

export default function ProductOverview() {
    const { data, isLoading } = useGetCategoriesList();

    const categories = data?.categories
        ?.map((apiCat) => {
            const localCat = CATEGORIES.find((c) => c.label === apiCat.name);
            return localCat ? { ...localCat, apiId: apiCat.id } : null;
        })
        .filter(Boolean) ?? CATEGORIES;

    return (
        <View className="bg-[#F0EFDF] px-6 py-8 gap-6">
            <ThemedText weight="bold" className="text-2xl text-center tracking-widest text-[#33232C]">
                NUESTROS PRODUCTOS
            </ThemedText>

            <View className="flex-row flex-wrap">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <View key={i} className="w-1/3 py-3 items-center gap-2">
                            <Skeleton width={48} height={48} />
                            <Skeleton width={72} height={10} />
                            <Skeleton width={56} height={10} />
                        </View>
                    ))
                    : categories.map((category) => (
                        <IconWithText
                            key={category!.id}
                            name={category!.iconName}
                            label={category!.label}
                            className="w-1/3 py-3"
                            onPress={() => router.push(`/(tabs)/products?categoryId=${category!.apiId}` as any)}
                        />
                    ))
                }
            </View>
        </View>
    );
}