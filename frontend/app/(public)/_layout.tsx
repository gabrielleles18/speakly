import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';

export default function AuthLayout() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // Aguarda o carregamento do token antes de verificar
        if (loading) return;

        // Se o usuário está autenticado, redireciona para as rotas protegidas
        if (isAuthenticated) {
            router.replace('/' as any);
        }
    }, [isAuthenticated, loading, router]);

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}
