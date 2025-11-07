import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';

export default function ProtectedLayout() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // Aguarda o carregamento do token antes de verificar
        if (loading) return;

        // Se não estiver autenticado, redireciona para login
        if (!isAuthenticated) {
            router.replace('/login' as any);
        }
    }, [isAuthenticated, loading, router]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="video" options={{ headerShown: false }} />
        </Stack>
    );
}
