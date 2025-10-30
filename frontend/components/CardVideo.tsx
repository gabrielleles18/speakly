import { Clock } from '@tamagui/lucide-icons';
import { Image, TouchableOpacity } from 'react-native';
import { Card, Paragraph, XStack, YStack } from 'tamagui';

interface CardVideoProps {
    title: string;
    description: string;
    duration: string;
    image: string;
}

export default function CardVideo({ title, description, duration, image }: CardVideoProps) {
    return (
        <TouchableOpacity>
            <Card
                size="$4"
                p="$3"
                borderRadius="$6"
                flexDirection="row"
                gap="$3"
                flex={1}
                borderWidth={1}
                borderColor="$borderColor"
            >
                <Image
                    source={{
                        uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg',
                    }}
                    style={{ width: 140, height: 90, borderRadius: 12 }}
                    resizeMode="cover"
                />

                <YStack flex={1} gap="$2" justifyContent="center">
                    <Paragraph
                        size="$4"
                        color="$white3"
                        flexWrap="wrap"
                        numberOfLines={2}
                        lineHeight="$lineHeight"
                    >
                        Daily English Conversation Daily English Conversation
                    </Paragraph>

                    <Paragraph size="$1" color="$green8">
                        At the Restaurant
                    </Paragraph>

                    <XStack alignItems="center" gap="$1.5" justifyContent="flex-end">
                        <Clock size="$0.75" color="$white8" />
                        <Paragraph size="$1" color="$white8">
                            12 min
                        </Paragraph>
                    </XStack>
                </YStack>
            </Card>
        </TouchableOpacity>
    );
}
