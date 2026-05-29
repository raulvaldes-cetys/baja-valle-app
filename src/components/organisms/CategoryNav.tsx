import { IconWithText } from "@/components/molecules/IconWithText";
import { CATEGORIES, CategoryId } from "@/constants/categories";
import { useState } from "react";
import { ScrollView } from "react-native";

interface CategoryNavProps {
  onCategoryChange?: (id: CategoryId) => void;
}

export default function CategoryNav({ onCategoryChange }: CategoryNavProps) {
  const [activeId, setActiveId] = useState<CategoryId>("vinicolas");

  function handlePress(id: CategoryId) {
    setActiveId(id);
    onCategoryChange?.(id);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex-row gap-10 px-5 py-5"
    >
      {CATEGORIES.map((cat) => (
        <IconWithText
          key={cat.id}
          name={cat.iconName}
          label={cat.label}
          onPress={() => handlePress(cat.id)}
          className="w-20"
        />
      ))}
    </ScrollView>
  );
}
