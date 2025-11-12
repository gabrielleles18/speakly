import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Form, Heading, Input, Label, Paragraph, Text, XStack } from 'tamagui';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../store/authSlice';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string('Password must be at least 6 characters').min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error, userData } = useAppSelector((state) => state.auth);
    

    // Redireciona se já estiver autenticado
    useEffect(() => {
        if (userData?.isAuthenticated && !loading) {
            router.replace('/' as any);
        }
    }, [userData, loading, router]);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur', // valida por campo ao sair (melhor UX)
    });

    const onSubmit = async (data: LoginValues) => {
        const response = await dispatch(login({ email: data.email, password: data.password }));
        if (
            response.meta.requestStatus === 'fulfilled' &&
            (response.payload as any).isAuthenticated
        ) {
            router.replace('/');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <XStack flex={1} justify="center" alignItems="center" px="$4" bg="$background">
                    <Card size="$4" flex={1} pb="$4" boxShadow="1  0 1px $color.gray.3">
                        <Card.Header>
                            <Heading size="$6">Sign in</Heading>
                        </Card.Header>
                        <Form px="$4" onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="test@test.com"
                                            keyboardType="email-address"
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            autoCapitalize="none"
                                        />
                                        {fieldState.error && (
                                            <Paragraph fontSize="$1" color="red">
                                                {fieldState.error.message}
                                            </Paragraph>
                                        )}
                                    </>
                                )}
                            />

                            <Controller
                                control={control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            placeholder="****"
                                            secureTextEntry
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            autoCapitalize="none"
                                        />
                                        {fieldState.error && (
                                            <Paragraph fontSize="$1" color="red">
                                                {fieldState.error.message}
                                            </Paragraph>
                                        )}
                                    </>
                                )}
                            />
                            {error && (
                                <Paragraph fontSize="$1" color="red">
                                    {error}
                                </Paragraph>
                            )}
                            <TouchableOpacity onPress={() => {}}>
                                <Text
                                    fontSize="$2"
                                    textAlign="right"
                                    mt="$2"
                                    textDecorationLine="underline"
                                    theme="red"
                                >
                                    Forgot your password?
                                </Text>
                            </TouchableOpacity>

                            <Form.Trigger asChild mt="$6">
                                <Button size="$5" theme="green" disabled={loading}>
                                    {loading ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </Form.Trigger>

                            <XStack justify="center" gap="$1" mt="$4">
                                <Text fontSize="$2">Don't have an account? </Text>
                                <Link href="/register">
                                    <Text fontSize="$2" textDecorationLine="underline" theme="blue">
                                        Sign up
                                    </Text>
                                </Link>
                            </XStack>
                        </Form>
                    </Card>
                </XStack>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
