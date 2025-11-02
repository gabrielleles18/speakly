import { subtitles } from '@/util/subtitleTest';
import { ArrowLeftToLine, ArrowRightToLine, Pause, Play } from '@tamagui/lucide-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { YoutubeView, useYouTubePlayer } from 'react-native-youtube-bridge';
import { Card, Circle, ColorTokens, Paragraph, View, XStack } from 'tamagui';

const YouTubeInitialProps = {
    autoplay: false,
    controls: false,
    playsinline: false,
    rel: false,
    muted: false,
    language: 'en-US',
    recommendedVideos: false,
    relatedVideos: false,
    captions: false,
    subtitles: false,
    subtitlesLanguage: 'en-US',
    subtitlesStyle: 'default',
    subtitlesColor: '#ffffff',
    subtitlesBackgroundColor: '#000000',
    subtitlesFontSize: 16,
};

function YoutubePlay({ videoId }: { videoId: string }) {
    const player = useYouTubePlayer(videoId, YouTubeInitialProps);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState<number>();
    const flatListRef = useRef<FlatList>(null);
    const lastActiveIndexRef = useRef<number | null>(null);

    // Atualiza o tempo atual periodicamente
    useEffect(() => {
        const updateTime = async () => {
            const time = await player.getCurrentTime();
            if (time !== undefined) {
                setCurrentTime(time);
            }
        };

        // Atualiza mais frequentemente quando está tocando
        const interval = setInterval(updateTime, isPlaying ? 100 : 500);

        // Atualiza uma vez imediatamente
        updateTime();

        return () => clearInterval(interval);
    }, [isPlaying, player]);

    const onPlay = useCallback(() => {
        if (isPlaying) {
            player.pause();
            setIsPlaying(false);
            return;
        }

        player.play();
        setIsPlaying(true);
    }, [isPlaying]);

    const seekTo = async (type: 'backward' | 'forward') => {
        const timeNow = await player.getCurrentTime();
        if (timeNow === undefined) return;

        const currentSubtitle = getActiveSubtitleIndex();
        if (!currentSubtitle) return;
        const nextSubtitleIndex = subtitles.find((subtitle) => {
            if (type === 'forward') {
                return subtitle.id === currentSubtitle.subtitle.id + 1;
            } else {
                return subtitle.id === currentSubtitle.subtitle.id - 1;
            }
        });

        //const timeToSeek =  parseTimeToMilliseconds(nextSubtitleIndex?.start || '00:00:00,000');
        const timeToSeek = nextSubtitleIndex?.start ?? '00:00:00,000';
        // Converter milissegundos para segundos (número decimal)
        const timeToSeekSeconds = parseTimeToMilliseconds(timeToSeek) / 1000;
        console.log({ timeToSeekSeconds });

        player.seekTo(timeToSeekSeconds, true);
        setCurrentTime(timeToSeekSeconds * 1000);
    };

    const pretifyTime = (time: string) => {
        const [hours, minutes, seconds] = time.split(':');

        const formattedSeconds = seconds.split(',')[0];
        return `${minutes}:${formattedSeconds}`;
    };

    const parseTimeToMilliseconds = (time: string): number => {
        const [hours, minutes, seconds] = time.split(':');
        const [milliseconds] = seconds.split(',');

        return (
            parseInt(hours) * 3600 * 1000 +
            parseInt(minutes) * 60 * 1000 +
            parseInt(seconds) * 1000 +
            parseInt(milliseconds)
        );
    };

    const getTimeColor = (start: string, end: string, currentTimeSeconds: number): ColorTokens => {
        const startMilliseconds = parseTimeToMilliseconds(start);
        const endMilliseconds = parseTimeToMilliseconds(end);
        const currentMilliseconds = currentTimeSeconds * 1000;

        // Verde se o tempo atual está dentro do intervalo [start, end]
        if (currentMilliseconds >= startMilliseconds && currentMilliseconds <= endMilliseconds) {
            return '$green8';
        }

        // Azul se ainda não chegou ou já passou
        return '$blue1';
    };

    // Encontra o índice da legenda ativa no momento atual
    const getActiveSubtitleIndex = useCallback((): { index: number; subtitle: any } | null => {
        const currentMilliseconds = currentTime * 1000;

        console.log('currentTime', currentTime);

        // Procura pela legenda que está ativa no momento
        for (let i = 0; i < subtitles.length; i++) {
            const subtitle = subtitles[i];
            const startMilliseconds = parseTimeToMilliseconds(subtitle.start);
            const endMilliseconds = parseTimeToMilliseconds(subtitle.end);

            if (
                currentMilliseconds >= startMilliseconds &&
                currentMilliseconds <= endMilliseconds
            ) {
                return { index: i, subtitle };
            }
        }

        // Se não encontrou nenhuma ativa, retorna a próxima que ainda não começou
        for (let i = 0; i < subtitles.length; i++) {
            const subtitle = subtitles[i];
            const startMilliseconds = parseTimeToMilliseconds(subtitle.start);
            if (currentMilliseconds < startMilliseconds) {
                return { index: Math.max(0, i), subtitle }; // Retorna a próxima ou a primeira
            }
        }

        // Se já passou de tudo, retorna a última
        return { index: subtitles.length - 1, subtitle: subtitles[subtitles.length - 1] };
    }, [currentTime]);

    // Scroll automático para manter a legenda ativa no topo
    useEffect(() => {
        const activeIndexObject = getActiveSubtitleIndex();
        if (!activeIndexObject) return;

        const activeIndex = activeIndexObject.index;

        if (activeIndex !== lastActiveIndexRef.current && flatListRef.current) {
            lastActiveIndexRef.current = activeIndex;
            flatListRef.current.scrollToIndex({
                index: activeIndex,
                animated: true,
                viewPosition: 0, // Mantém o item selecionado no topo
            });
        }
    }, [currentTime, getActiveSubtitleIndex]);

    console.log(currentTime);

    return (
        <View gap="$4" flex={1}>
            <YoutubeView player={player} height={240} />
            <XStack px="$4" flex={1}>
                <FlatList
                    ref={flatListRef}
                    data={subtitles}
                    keyExtractor={(item) => item.id.toString()}
                    getItemLayout={(data, index) => ({
                        length: 100, // Altura aproximada: minHeight 40 + padding + margin
                        offset: 100 * index,
                        index,
                    })}
                    onScrollToIndexFailed={(info) => {
                        // Se o scroll falhar, tenta novamente após um pequeno delay
                        const wait = new Promise((resolve) => setTimeout(resolve, 100));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({
                                index: info.index,
                                animated: false, // Sem animação no retry
                            });
                        });
                    }}
                    renderItem={({ item: { id, start, end, text } }) => (
                        <Card
                            key={id}
                            backgroundColor={getTimeColor(start, end, currentTime)}
                            p="$3"
                            borderRadius="$4"
                            mb="$2"
                            minHeight={40}
                        >
                            <Paragraph size="$1" color="$green8">
                                {pretifyTime(end)}
                            </Paragraph>
                            <Paragraph size="$6" color="$white3" lineHeight="$4">
                                {text}
                            </Paragraph>
                        </Card>
                    )}
                />
            </XStack>
            <XStack
                gap="$4"
                justifyContent="center"
                alignItems="center"
                backgroundColor="$white12"
                pt="$3"
                pb="$6"
            >
                <TouchableOpacity onPress={() => seekTo('backward')}>
                    <Circle size="$4" borderWidth={1} borderColor="$white11" borderRadius="$10">
                        <ArrowLeftToLine size="$1" />
                    </Circle>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPlay}>
                    <Circle size="$6" bg="$blue7" borderRadius="$10">
                        {isPlaying ? <Pause size="$2" /> : <Play size="$2" />}
                    </Circle>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => seekTo('forward')}>
                    <Circle size="$4" borderWidth={1} borderColor="$white11" borderRadius="$10">
                        <ArrowRightToLine size="$1" />
                    </Circle>
                </TouchableOpacity>
            </XStack>
        </View>
    );
}

export default YoutubePlay;
