import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';

import { tamaguiConfig } from '@/tamagui.config';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from '../store';
import { loadStoredToken } from '../store/authSlice';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(public)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <AuthInitializer>
                <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
                    <StatusBar backgroundColor="#3b34d5" />
                    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                        <Stack>
                            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                            <Stack.Screen name="(public)" options={{ headerShown: false }} />
                        </Stack>
                    </ThemeProvider>
                </TamaguiProvider>
            </AuthInitializer>
        </Provider>
    );
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // Carrega o token armazenado quando o app inicia
        dispatch(loadStoredToken());
    }, [dispatch]);

    // Mostra loading enquanto verifica o token (apenas na primeira vez)
    if (loading) {
        return null; // Mantém o splash screen enquanto carrega
    }

    return <>{children}</>;
}
