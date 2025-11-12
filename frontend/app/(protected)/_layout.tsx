import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';

export default function ProtectedLayout() {
    const router = useRouter();
    const { userData, loading } = useAppSelector((state) => state.auth);

    console.log({ userData });
    console.log({ loading });
    console.log('--------------------------------');

    useEffect(() => {
        // Aguarda o carregamento do token antes de verificar
        if (loading) return;

        // Se não estiver autenticado, redireciona para login
        if (!userData?.isAuthenticated) {
            router.replace('/login' as any);
        }
    }, [userData, loading, router]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="video" options={{ headerShown: false }} />
        </Stack>
    );
}
