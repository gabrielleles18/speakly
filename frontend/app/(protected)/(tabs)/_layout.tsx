import { BookOpen, Heart, Home, User } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

export default function TabLayout() {
    const theme = useTheme(); 

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: theme.green10.val,
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <Home color={color as any} size="$1" />,
                    }}
                />
                <Tabs.Screen
                    name="favorite"
                    options={{
                        title: 'Favorite',
                        tabBarIcon: ({ color }) => <Heart color={color as any} size="$1" />,
                    }}
                />
                <Tabs.Screen
                    name="practice"
                    options={{
                        title: 'Practice',
                        tabBarIcon: ({ color }) => <BookOpen color={color as any} size="$1" />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <User color={color as any} size="$1" />,
                    }}
                />
            </Tabs>
        </>
    );
}
