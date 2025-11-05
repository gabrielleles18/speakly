import YoutubePlay from '@/components/YoutubePlay';
import { ArrowLeft, Heart } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Paragraph, useTheme, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

export default function VideoSingleScreen() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
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
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <XStack alignItems="center" gap="$4">
                        <TouchableOpacity onPress={() => router.back()} style={{ padding: 5 }}>
                            <ArrowLeft size="$1" />
                        </TouchableOpacity>
                        <YStack>
                            <Heading size="$2">Business English - Interview Skills</Heading>
                            <Paragraph size="$1" color="$white3">
                                Interview S
                            </Paragraph>
                        </YStack>
                    </XStack>
                    <TouchableOpacity onPress={() => {}} style={{ padding: 2 }}>
                        <Heart size="$1" />
                    </TouchableOpacity>
                </LinearGradient>
                <YoutubePlay videoId="_K-L9uhsBLM" />
            </YStack>
        </SafeAreaView>
    );
}
