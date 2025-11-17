import { useAppSelector } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Button,
    Form,
    Heading,
    Input,
    Label,
    Paragraph,
    ScrollView,
    useTheme,
    XStack,
    YStack,
} from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';
import { z } from 'zod';
import { useAppDispatch } from '@/store';
import { updateProfile } from '@/store/authSlice';
const profileEditSchema = z.object({
    name: z.string().min(1),
    currentPassword: z.string().min(1),
    newPassword: z.string().min(1),
});

type ProfileEditValues = z.infer<typeof profileEditSchema>;
export default function ProfileEditScreen() {
    const { userData, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileEditValues>({
        resolver: zodResolver(profileEditSchema),
        defaultValues: {
            name: userData?.user.name || '',
            currentPassword: '',
            newPassword: '',
        },
        mode: 'onBlur', // valida por campo ao sair (melhor UX)
    });

    const onSubmit = async (data: ProfileEditValues) => {
        const response = await dispatch(updateProfile(data));
        if (response.meta.requestStatus === 'fulfilled') {
            router.back();
        }
    };

    const isLoading = false;

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$background">
                <LinearGradient
                    colors={[theme.blue4.val, theme.green8.val]}
                    locations={[0.5, 1]}
                    start={{ x: 0.6, y: 0 }}
                    end={{ x: 0.7, y: 1 }}
                    px="$4"
                    py="$4"
                    gap="$5"
                    boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
                    flexDirection="column"
                >
                    <XStack gap="$4">
                        <TouchableOpacity onPress={() => router.back()} style={{ padding: 5 }}>
                            <ArrowLeft size="$1" />
                        </TouchableOpacity>
                        <YStack>
                            <Heading size="$2">Profile Edit</Heading>
                            <Paragraph size="$1" color="$white3">
                                Edit your profile information
                            </Paragraph>
                        </YStack>
                    </XStack>
                </LinearGradient>

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
                        name="currentPassword"
                        render={({ field, fieldState }) => (
                            <>
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
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
                        name="newPassword"
                        render={({ field, fieldState }) => (
                            <>
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
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
                                'Update Profile'
                            )}
                        </Button>
                    </Form.Trigger>
                </Form>
            </ScrollView>
        </SafeAreaView>
    );
}
