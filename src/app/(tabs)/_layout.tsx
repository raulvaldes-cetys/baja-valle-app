import TabBar from '@/components/molecules/TabBar';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => null,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'home' }} />
      <Tabs.Screen name="products" options={{ title: 'products' }} />
      <Tabs.Screen name="product/[id]" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="shoppingCart" options={{ title: 'shoppingCart' }} />
      <Tabs.Screen name="cart-checkout" options={{ href: null }} />
      {/* <Tabs.Screen name="favorites" options={{ title: 'favorites' }} /> */}
    </Tabs>
  );
}
