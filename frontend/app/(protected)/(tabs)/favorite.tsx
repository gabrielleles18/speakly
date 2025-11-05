import CardVideo from '@/components/CardVideo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Paragraph, ScrollView, useTheme, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

export default function FavoriteScreen() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$background">
                <YStack flex={1} background="$background">
                    <LinearGradient
                        colors={[theme.blue4.val, theme.green8.val]}
                        locations={[0.5, 1]}
                        start={{ x: 0.6, y: 0 }}
                        end={{ x: 0.7, y: 1 }}
                        px="$4"
                        py="$4"
                        gap="$5"
                        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
                    >
                        <YStack gap="$1">
                            <Heading size="$3">Favorites</Heading>
                            <Paragraph size="$1" color="$white3">
                                Your favorite videos are here
                            </Paragraph>
                        </YStack>
                    </LinearGradient>
                    <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$background">
                        <YStack gap="$3" m="$4">
                            <CardVideo />
                            <CardVideo />
                        </YStack>
                    </ScrollView>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}
