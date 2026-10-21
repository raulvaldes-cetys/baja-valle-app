import ProfileScreen from "@/components/organisms/ProfileScreen";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();
    if (!user) return null;
    return <ProfileScreen />;
}
