import { Skeleton } from "@/components/atoms/Skeleton";
import ProductDetailScreen from "@/components/organisms/ProductDetailScreen";
import { useGetProductById } from "@/services/queries/use-get-product-by-id";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

function ProductDetailSkeleton() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Skeleton height={320} width="100%" />
      <View className="bg-white px-5 pt-10 pb-8 gap-4">
        <Skeleton height={16} width="90%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="85%" />
        <Skeleton height={14} width="70%" />
        <View className="mt-4 gap-2">
          <Skeleton height={16} width="40%" />
          <Skeleton height={14} width="95%" />
          <Skeleton height={14} width="80%" />
          <Skeleton height={14} width="88%" />
        </View>
        <View className="mt-4">
          <Skeleton height={16} width="35%" />
          <View className="mt-2">
            <Skeleton height={28} width="50%" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetProductById(id);

  if (isLoading) return <ProductDetailSkeleton />;
  if (!data) return null;

  return <ProductDetailScreen product={data} />;
}
