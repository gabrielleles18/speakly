import { ArrowLeft, AudioLines, Eye, Mic, PercentCircle, X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Button,
    Card,
    Circle,
    Group,
    Heading,
    Paragraph,
    Progress,
    ScrollView,
    useTheme,
    XStack,
    YStack,
} from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

export default function PronunciationScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [hiddenTranslation, setHiddenTranslation] = useState<boolean>(true);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isRecorded, setIsRecorded] = useState<boolean>(true);

    const sentence = 'Would you like something to drink?';
    const translation = 'Você gostaria de algo para beber?';

    const countTranslation = translation.length;

    const getAstersks = () => {
        return '*'.repeat(countTranslation);
    };

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
                    <XStack gap="$4" justifyContent="space-between" alignItems="center">
                        <XStack gap="$4">
                            <TouchableOpacity onPress={() => router.back()} style={{ padding: 5 }}>
                                <ArrowLeft size="$1" />
                            </TouchableOpacity>
                            <YStack>
                                <Heading size="$2">Pronunciation Practice</Heading>
                                <Paragraph size="$1" color="$white3">
                                    Sentence 2 of 4
                                </Paragraph>
                            </YStack>
                        </XStack>
                        <XStack
                            alignItems="center"
                            gap="$2"
                            backgroundColor="rgba(255, 255, 255, 0.06)"
                            borderWidth={1}
                            borderColor="rgba(255, 255, 255, 0.09)"
                            borderRadius="$8"
                            px="$2.5"
                            py="$1.5"
                        >
                            <PercentCircle size="$1" color="$white3" />
                            <Paragraph size="$2" color="$white3">
                                50%
                            </Paragraph>
                        </XStack>
                    </XStack>
                    <Progress size="$4" value={7} height={10}>
                        <Progress.Indicator animation="bouncy" />
                    </Progress>
                </LinearGradient>

                <Card
                    px="$4"
                    py="$5"
                    borderRadius="$4"
                    backgroundColor="rgba(255, 255, 255, 0.06)"
                    borderWidth={1}
                    borderColor="rgba(255, 255, 255, 0.09)"
                    m="$4"
                    gap="$6"
                >
                    <AudioLines size="$1" color="$blue8" alignSelf="flex-end" />
                    <Paragraph size="$6" color="$white3" fontWeight="bold" textAlign="center">
                        {sentence}
                    </Paragraph>
                    <TouchableOpacity onPress={() => setHiddenTranslation(!hiddenTranslation)}>
                        <XStack alignItems="center" gap="$2" flex={1} justifyContent="center">
                            <Paragraph size="$3" color="$white9" textAlign="center">
                                {hiddenTranslation ? getAstersks() : translation}
                            </Paragraph>
                            <Eye size="$1" color="$white3" />
                        </XStack>
                    </TouchableOpacity>
                </Card>

                {!isRecorded && (
                    <YStack m="$4" mt="$8" gap="$4" alignItems="center">
                        <TouchableOpacity onPress={() => setIsRecording(!isRecording)}>
                            <Circle
                                backgroundColor={
                                    isRecording ? '$red8' : 'rgba(255, 255, 255, 0.06)'
                                }
                                borderWidth={1}
                                borderColor="rgba(255, 255, 255, 0.09)"
                                borderRadius="$20"
                                size="$12"
                            >
                                <Mic size="$2" color="$white3" />
                            </Circle>
                        </TouchableOpacity>

                        {isRecording && (
                            <XStack>
                                <Paragraph size="$3" color="$white3">
                                    Recording...
                                </Paragraph>
                            </XStack>
                        )}
                    </YStack>
                )}

                {isRecorded && (
                    <Card
                        p="$6"
                        borderRadius="$4"
                        backgroundColor="rgba(255, 255, 255, 0.06)"
                        borderWidth={1}
                        borderColor="rgba(255, 255, 255, 0.09)"
                        m="$4"
                        gap="$4"
                    >
                        <X size="$2" color="$red8" alignSelf="center" />
                        <Paragraph size="$6" color="$white3" fontWeight="bold" textAlign="center">
                            Try again
                        </Paragraph>
                        <Paragraph size="$3" color="$white9" textAlign="center">
                            Pay attention to the intonation
                        </Paragraph>
                        <Button size="$5" theme="red" onPress={() => setIsRecorded(false)}>
                            Try again
                        </Button>
                    </Card>
                )}

                
            </ScrollView>
            <YStack position="absolute" bottom="$0" left="$0" right="$0">
                    <Group orientation="horizontal" flex={1} mb="$6">
                        <Group.Item>
                            <Button flex={1}>Again</Button>
                        </Group.Item>
                        <Group.Item>
                            <Button flex={1}>Hard</Button>
                        </Group.Item>
                        <Group.Item>
                            <Button flex={1}>Good</Button>
                        </Group.Item>
                        <Group.Item>
                            <Button flex={1}>Easy</Button>
                        </Group.Item>
                    </Group>
                </YStack>
        </SafeAreaView>
    );
}
