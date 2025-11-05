import CardSentence from '@/components/CardSentence';
import { BookOpen } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Button,
    Card,
    Circle,
    Group,
    Heading,
    Paragraph,
    ScrollView,
    useTheme,
    XStack,
    YStack,
} from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

export default function PracticeScreen() {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState<'all' | 'reviewed' | 'dominated'>('all');

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$background">
                <YStack flex={1} background="$background">
                    <LinearGradient
                        colors={[theme.blue4.val, theme.green8.val]}
                        locations={[0.5, 1]}
                        start={{ x: 0.6, y: 0 }}
                        end={{ x: 0.7, y: 1 }}
                        borderBottomLeftRadius="$10"
                        borderBottomRightRadius="$10"
                        px="$4"
                        py="$4"
                        pb="$5"
                        gap="$5"
                        boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
                    >
                        <YStack gap="$1">
                            <Heading size="$3">My sentences</Heading>
                            <Paragraph size="$1" color="$white3">
                                Your sentences are here
                            </Paragraph>
                        </YStack>

                        <XStack gap="$3" flex={1}>
                            <Card
                                size="$4"
                                p="$3"
                                borderRadius="$4"
                                backgroundColor="rgba(255, 255, 255, 0.06)"
                                gap="$2"
                                borderWidth={1}
                                borderColor="rgba(255, 255, 255, 0.09)"
                                alignItems="center"
                                justifyContent="center"
                                flex={1}
                                flexGrow={1}
                                flexShrink={0}
                                minHeight={30}
                            >
                                <Heading size="$2" p="$0" color="$white3" fontWeight="bold">
                                    234
                                </Heading>
                                <Paragraph size="$2" color="$white3">
                                    Total
                                </Paragraph>
                            </Card>
                            <Card
                                size="$4"
                                p="$3"
                                borderRadius="$4"
                                backgroundColor="rgba(255, 255, 255, 0.06)"
                                gap="$2"
                                borderWidth={1}
                                borderColor="rgba(255, 255, 255, 0.09)"
                                alignItems="center"
                                justifyContent="center"
                                flex={1}
                                flexGrow={1}
                                flexShrink={0}
                                minHeight={30}
                            >
                                <Heading size="$2" p="$0" color="$white3" fontWeight="bold">
                                    23
                                </Heading>
                                <Paragraph size="$2" color="$white3">
                                    Review
                                </Paragraph>
                            </Card>
                            <Card
                                size="$4"
                                p="$3"
                                borderRadius="$4"
                                backgroundColor="rgba(255, 255, 255, 0.06)"
                                gap="$2"
                                borderWidth={1}
                                borderColor="rgba(255, 255, 255, 0.09)"
                                alignItems="center"
                                justifyContent="center"
                                flex={1}
                                flexGrow={1}
                                flexShrink={0}
                                minHeight={30}
                            >
                                <Heading size="$2" p="$0" color="$white3" fontWeight="bold">
                                    12
                                </Heading>
                                <Paragraph size="$2" color="$white3">
                                    Dominated
                                </Paragraph>
                            </Card>
                        </XStack>
                    </LinearGradient>
                    <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$background">
                        <LinearGradient
                            colors={[theme.red6.val, theme.blue4.val]}
                            locations={[0.1, 0.9]}
                            start={{ x: 0.2, y: 0 }}
                            end={{ x: 0.5, y: 2 }}
                            borderRadius="$5"
                            p="$4"
                            gap="$3"
                            boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
                            mt="$4"
                            mx="$4"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <Circle
                                size="$5"
                                p="$3"
                                backgroundColor="rgba(255, 255, 255, 0.06)"
                                borderColor="rgba(255, 255, 255, 0.09)"
                                borderWidth={1}
                            >
                                <BookOpen size="$1" color="$white3" />
                            </Circle>
                            <YStack gap="$1" flex={1}>
                                <Heading size="$2" color="$white3">
                                    Spaced Revision
                                </Heading>
                                <Paragraph size="$1" color="$white3">
                                    2 sentences to review today
                                </Paragraph>
                            </YStack>
                            <Button backgroundColor="$white3">
                                <Paragraph size="$4" color="$black5" fontWeight="bold">
                                    Review
                                </Paragraph>
                            </Button>
                        </LinearGradient>

                        <Group orientation="horizontal" m="$4" mb="$0" flex={1}>
                            <Group.Item>
                                <Button
                                    flex={1}
                                    backgroundColor={
                                        selectedTab === 'all'
                                            ? '$green8'
                                            : 'rgba(255, 255, 255, 0.06)'
                                    }
                                    onPress={() => setSelectedTab('all')}
                                >
                                    All
                                </Button>
                            </Group.Item>
                            <Group.Item>
                                <Button
                                    flex={1}
                                    backgroundColor={
                                        selectedTab === 'reviewed'
                                            ? '$green8'
                                            : 'rgba(255, 255, 255, 0.06)'
                                    }
                                    onPress={() => setSelectedTab('reviewed')}
                                >
                                    Reviewed
                                </Button>
                            </Group.Item>
                            <Group.Item>
                                <Button
                                    flex={1}
                                    backgroundColor={
                                        selectedTab === 'dominated'
                                            ? '$green8'
                                            : 'rgba(255, 255, 255, 0.06)'
                                    }
                                    onPress={() => setSelectedTab('dominated')}
                                >
                                    dominated
                                </Button>
                            </Group.Item>
                        </Group>

                        <YStack gap="$3" m="$4">
                            {selectedTab === 'all' && (
                                <>
                                    <CardSentence />
                                    <CardSentence />
                                </>
                            )}
                            {selectedTab === 'reviewed' && (
                                <>
                                    <CardSentence />
                                </>
                            )}
                        </YStack>
                    </ScrollView>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}
