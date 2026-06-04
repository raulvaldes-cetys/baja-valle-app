import { IconWithText } from "@/components/molecules/IconWithText";
import { CATEGORIES } from "@/constants/categories";
import { useGetCategoriesList } from "@/services/queries/use-get-categories-list";
import { ScrollView } from "react-native";

interface CategoryNavProps {
  activeApiId: number;
  onCategoryChange?: (apiId: number) => void;
}

export default function CategoryNav({ activeApiId, onCategoryChange }: CategoryNavProps) {
  const { data } = useGetCategoriesList();

  const categories = data?.categories
    ?.map((apiCat) => {
      const localCat = CATEGORIES.find((c) => c.label === apiCat.name);
      return localCat ? { ...localCat, apiId: apiCat.id, apiName: apiCat.name } : null;
    })
    .filter(Boolean) ?? [];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex-row gap-10 px-5 py-5"
    >
      {categories.map((cat) => (
        <IconWithText
          key={cat!.apiId}
          name={cat!.iconName}
          label={cat!.apiName}
          onPress={() => onCategoryChange?.(cat!.apiId)}
          className="w-20"
          labelClassName="text-xs"
        />
      ))}
    </ScrollView>
  );
}
