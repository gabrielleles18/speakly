import CardVideo from '@/components/CardVideo';
import { TrendingUp, Video } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Heading, Paragraph, ScrollView, View, XStack, YStack, useTheme } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

export default function TabOneScreen() {
    const router = useRouter();
    const theme = useTheme();

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} bg="$background">
                <LinearGradient
                    colors={[theme.blue4.val, theme.green8.val]}
                    locations={[0.5, 1]}
                    start={{ x: 0.6, y: 0 }}
                    end={{ x: 0.7, y: 1 }}
                    borderBottomLeftRadius="$10"
                    borderBottomRightRadius="$10"
                    px="$4"
                    py="$4"
                    pb="$7"
                    gap="$5"
                    boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
                >
                    <XStack gap="$2.5" alignItems="center">
                        <Card
                            size="$4"
                            p="$4"
                            borderRadius="$6"
                            width="$5"
                            height="$5"
                            alignItems="center"
                            justifyContent="center"
                            backgroundColor="rgba(255, 255, 255, 0.1)"
                        >
                            <Video size="$1.5" />
                        </Card>
                        <View gap="$1">
                            <Heading size="$2" p="$0">
                                Learn English with videos ✨
                            </Heading>
                            <Paragraph size="$1" color="$white3">
                                Thousands of videos for you to practice.
                            </Paragraph>
                        </View>
                    </XStack>

                    <XStack gap="$2.5">
                        <XStack gap="$2.5">
                            <Card
                                size="$4"
                                py="$2"
                                px="$3"
                                borderRadius="$4"
                                backgroundColor="rgba(255, 255, 255, 0.06)"
                                gap="$3"
                                alignItems="center"
                                flexDirection="row"
                            >
                                <TrendingUp size="$1" color="$white8" />

                                <View>
                                    <Paragraph size="$1" color="$white8" lineHeight="$0.5">
                                        Your progress
                                    </Paragraph>
                                    <Paragraph size="$1" color="$white3">
                                        12 days
                                    </Paragraph>
                                </View>
                            </Card>
                        </XStack>

                        <XStack gap="$2.5">
                            <Card
                                size="$4"
                                py="$2"
                                px="$3"
                                borderRadius="$4"
                                backgroundColor="rgba(255, 255, 255, 0.06)"
                                flexDirection="row"
                                gap="$3"
                                alignItems="center"
                            >
                                <Video size="$1" color="$white8" />

                                <View>
                                    <Paragraph size="$1" color="$white8" lineHeight="$0.5">
                                        Assisted
                                    </Paragraph>
                                    <Paragraph size="$1" color="$white3">
                                        4 videos
                                    </Paragraph>
                                </View>
                            </Card>
                        </XStack>
                    </XStack>
                </LinearGradient>

                <YStack p="$4">
                    <Heading size="$2" p="$0" mb="$4">
                        Recommended videos
                    </Heading>

                    <YStack gap="$3">
                        <CardVideo />
                        <CardVideo />
                    </YStack>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}
