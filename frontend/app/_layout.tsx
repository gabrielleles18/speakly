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
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

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

    const isDevelopment = __DEV__;
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: isDevelopment ? 0 : 1000 * 60 * 5, // 0 em dev, 5 min em produção
                refetchOnWindowFocus: isDevelopment ? true : false, // true em dev, false em produção
                refetchOnReconnect: isDevelopment ? true : false, // true em dev, false em produção
                retry: 1,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            },
            mutations: {
                retry: 1,
            },
        },
    });

    return (
        <Provider store={store}>
            <AuthInitializer>
                <QueryClientProvider client={queryClient}>
                    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
                        <StatusBar backgroundColor="#3b34d5" />
                        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                            <Stack>
                                <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                                <Stack.Screen name="(public)" options={{ headerShown: false }} />
                            </Stack>
                        </ThemeProvider>
                    </TamaguiProvider>
                </QueryClientProvider>
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
