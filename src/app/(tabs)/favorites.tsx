import FavoritesScreen from "@/components/organisms/FavoritesScreen";
import { useAuth } from "@/contexts/AuthContext";

export default function FavoritesPage() {
    const { user } = useAuth();
    if (!user) return null;
    return <FavoritesScreen />;
}
