import CardSentence from '@/components/CardSentence';
import { api } from '@/services/api';
import { BookOpen } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
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
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store';

export default function PracticeScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { userData } = useAppSelector((state) => state.auth);

    const [filter, setFilter] = useState<'all' | 'toReview' | 'dominated'>('all');

    const {
        data: sentences,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['sentences', filter],
        queryFn: () => api.get('/sentences/' + userData?.user.id + '?filter=' + filter),
    });

    return (
        <>
            
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
                                        {sentences?.data.total_all}
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
                                        {sentences?.data.total_review}
                                    </Heading>
                                    <Paragraph size="$2" color="$white3">
                                        To review
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
                                        {sentences?.data.total_dominated}
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
                                        {sentences?.data.total_review} sentences to review today
                                    </Paragraph>
                                </YStack>
                                <Button
                                    backgroundColor="$white3"
                                    onPress={() => router.push('/pronunciation')}
                                    pressStyle={{
                                        backgroundColor: '$white4',
                                        opacity: 0.7,
                                    }}
                                >
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
                                            filter === 'all'
                                                ? '$green8'
                                                : 'rgba(255, 255, 255, 0.06)'
                                        }
                                        onPress={() => setFilter('all')}
                                    >
                                        All
                                    </Button>
                                </Group.Item>
                                <Group.Item>
                                    <Button
                                        flex={1}
                                        backgroundColor={
                                            filter === 'toReview'
                                                ? '$green8'
                                                : 'rgba(255, 255, 255, 0.06)'
                                        }
                                        onPress={() => {
                                            setFilter('toReview');
                                        }}
                                    >
                                        To review
                                    </Button>
                                </Group.Item>
                                <Group.Item>
                                    <Button
                                        flex={1}
                                        backgroundColor={
                                            filter === 'dominated'
                                                ? '$green8'
                                                : 'rgba(255, 255, 255, 0.06)'
                                        }
                                        onPress={() => {
                                            setFilter('dominated');
                                        }}
                                    >
                                        Dominated
                                    </Button>
                                </Group.Item>
                            </Group>

                            <YStack gap="$3" m="$4">
                                {sentences?.data.sentences.map((sentence) => (
                                    <CardSentence
                                        key={sentence.id}
                                        sentence={sentence.sentence}
                                        translation={sentence.translation}
                                        reviewDate={sentence.next_review_date}
                                    />
                                ))}
                                
                            </YStack>
                        </ScrollView>
                    </YStack>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
