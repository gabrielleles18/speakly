import VideosResource from '@/interfaces/videos';
import { Clock } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable } from 'react-native';
import { Card, Paragraph, XStack, YStack } from 'tamagui';

export default function CardVideo({ video }: { video: VideosResource }) {
    const router = useRouter();

    const youtubeUrl = video.youtube_url;
    const videoId = youtubeUrl.split('v=')[1];
    const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    return (
        <Pressable
            onPress={() => router.push(`/video/${video.id.toString()}`)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
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
                        uri: thumbnail,
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
                        {video.title}
                    </Paragraph>

                    <Paragraph size="$1" color="$green8">
                        {video.channel}
                    </Paragraph>

                    <XStack alignItems="center" gap="$1.5" justifyContent="flex-end">
                        <Clock size="$0.75" color="$white8" />
                        <Paragraph size="$1" color="$white8">
                            {video.duration}
                        </Paragraph>
                    </XStack>
                </YStack>
            </Card>
        </Pressable>
    );
}
