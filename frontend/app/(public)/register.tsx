import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Button,
    Card,
    Form,
    Heading,
    Input,
    Label,
    Paragraph,
    ScrollView,
    Text,
    XStack,
} from 'tamagui';
import { z } from 'zod';
import { useAppSelector } from '../../store';

const registerSchema = z
    .object({
        name: z.string().min(1),
        email: z.string().email('Invalid email address'),
        password: z.string('Password must be at least 6 characters').min(6),
        confirmPassword: z.string().min(6, 'Passwords must match'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords must match',
    });

type RegisterValues = z.infer<typeof registerSchema>;

export default function Register() {
    const router = useRouter();
    const { userData, loading } = useAppSelector((state) => state.auth);

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
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onBlur', // valida por campo ao sair (melhor UX)
    });

    const onSubmit = async (data: RegisterValues) => {
        console.log(data);
    };

    const isLoading = false;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <XStack
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        px="$4"
                        backgroundColor="$background"
                    >
                        <Card size="$4" flex={1} pb="$4" boxShadow="1  0 1px $color.gray.3">
                            <Card.Header>
                                <Heading size="$6">Create an account</Heading>
                            </Card.Header>

                            <Form px="$4" onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="register-name">Name</Label>
                                            <Input
                                                id="register-name"
                                                placeholder="John Doe"
                                                keyboardType="default"
                                                value={field.value}
                                                onChangeText={field.onChange}
                                                onBlur={field.onBlur}
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
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="registerEmail">Email</Label>
                                            <Input
                                                id="registerEmail"
                                                placeholder="test@test.com"
                                                keyboardType="email-address"
                                                value={field.value}
                                                onChangeText={field.onChange}
                                                onBlur={field.onBlur}
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
                                            <Label htmlFor="registerPassword">Password</Label>
                                            <Input
                                                id="registerPassword"
                                                placeholder="****"
                                                secureTextEntry
                                                value={field.value}
                                                onChangeText={field.onChange}
                                                onBlur={field.onBlur}
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
                                    name="confirmPassword"
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Label htmlFor="confirmPassword">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                id="confirmPassword"
                                                placeholder="****"
                                                secureTextEntry
                                                value={field.value}
                                                onChangeText={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                            {fieldState.error && (
                                                <Paragraph fontSize="$1" color="red">
                                                    {fieldState.error.message}
                                                </Paragraph>
                                            )}
                                        </>
                                    )}
                                />

                                <Form.Trigger asChild mt="$6">
                                    <Button size="$5" theme="green" disabled={isLoading}>
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color="white" />
                                        ) : (
                                            'Create account'
                                        )}
                                    </Button>
                                </Form.Trigger>

                                <XStack justify="center" gap="$1" mt="$4">
                                    <Text fontSize="$2">Already have an account? </Text>
                                    <Link href="/login">
                                        <Text
                                            fontSize="$2"
                                            textDecorationLine="underline"
                                            theme="blue"
                                        >
                                            Login
                                        </Text>
                                    </Link>
                                </XStack>
                            </Form>
                        </Card>
                    </XStack>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
