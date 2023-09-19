import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          '#00262C' /* Colors[colorScheme ?? 'light'].tint, */,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(index)" // Route to index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="birthdays"
        options={{
          title: 'Birthdays',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="birthday-cake" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'Add New',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
