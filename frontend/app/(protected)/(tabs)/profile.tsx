import { api } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/authSlice';
import { HelpCircle, Pencil } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Avatar,
    Button,
    Card,
    Heading,
    Paragraph,
    Progress,
    ScrollView,
    Separator,
    View,
    XStack,
    YStack,
    useTheme,
} from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';
// Locale opcional para português
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

// Função para extrair as iniciais do nome
function getInitials(name: string | undefined): string {
    if (!name) return '';

    const words = name
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

    if (words.length === 0) return '';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();

    // Retorna primeira letra do primeiro nome e primeira letra do último sobrenome
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export default function ProfileScreen() {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, userData } = useAppSelector((state) => state.auth);

    const { data: daysPracticedConsecutive } = useQuery({
        queryKey: ['daysPracticed'],
        queryFn: () => api.get(`/user-activities/days-practiced/${userData?.user.id}`),
        enabled: !loading && userData?.user !== undefined,
    });

    const { data: totalSentencesPracticed } = useQuery({
        queryKey: ['totalSentencesPracticed'],
        queryFn: () => api.get(`/user-activities/total-sentences-practiced/${userData?.user.id}`),
        enabled: !loading && userData?.user !== undefined,
    });

    const { data: totalVideosWatched } = useQuery({
        queryKey: ['totalVideosWatched'],
        queryFn: () => api.get(`/user-activities/watched-videos/${userData?.user.id}`),
        enabled: !loading && userData?.user !== undefined,
    });

    const { data: totalDaysPracticed } = useQuery({
        queryKey: ['totalDaysPracticed'],
        queryFn: () => api.get(`/user-activities/total-days-practiced/${userData?.user.id}`),
        enabled: !loading && userData?.user !== undefined,
    });

    function gerarCalendario(
        mes = dayjs().locale('pt-br').month(),
        ano = dayjs().locale('pt-br').year()
    ) {
        const inicioMes = dayjs(new Date(ano, mes, 1));
        const diasNoMes = inicioMes.daysInMonth();

        const semanas = [];
        let semana = new Array(7).fill(null);

        // Preenche os dias do mês
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const data = dayjs(new Date(ano, mes, dia));
            const diaSemana = data.day();

            semana[diaSemana] = dia;

            // Quando chega no sábado, fecha a semana
            if (diaSemana === 6 || dia === diasNoMes) {
                semanas.push(semana);
                semana = new Array(7).fill(null);
            }
        }

        return semanas;
    }

    const calendario = gerarCalendario();

    const getLevel = (sentences: number) => {
        if (sentences <= 0) {
            return 'Beginner';
        } else if (sentences < 100) {
            return 'Beginner +';
        } else if (sentences < 200) {
            return 'Beginner ++';
        } else if (sentences < 500) {
            return 'Intermediate';
        } else if (sentences < 1000) {
            return 'Intermediate +';
        } else if (sentences < 1500) {
            return 'Intermediate ++';
        } else if (sentences < 2000) {
            return 'Advanced';
        } else if (sentences < 2500) {
            return 'Advanced +';
        } else if (sentences < 3000) {
            return 'Advanced ++';
        } else if (sentences < 3500) {
            return 'Expert';
        } else if (sentences < 4000) {
            return 'Expert +';
        } else if (sentences < 5000) {
            return 'Expert ++';
        } else {
            return 'Master';
        }
    };

    const getLevelProgressPercentage = (sentences: number) => {
        return Math.round(Math.min(Math.max((sentences / 5000) * 100, 0), 100));
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$background">
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
                    <XStack gap="$2.5" alignItems="center">
                        <View gap="$1">
                            <Heading size="$3" p="$0">
                                Profile
                            </Heading>
                            <Paragraph size="$2" color="$white3">
                                Your learning progress
                            </Paragraph>
                        </View>
                    </XStack>

                    <XStack gap="$2.5">
                        <Card
                            size="$4"
                            p="$3"
                            borderRadius="$4"
                            backgroundColor="rgba(255, 255, 255, 0.06)"
                            flex={1}
                            borderWidth={1}
                            borderColor="rgba(255, 255, 255, 0.09)"
                            minHeight={180}
                        >
                            <XStack gap="$4">
                                <Avatar
                                    circular
                                    size="$8"
                                    borderWidth={0.5}
                                    borderColor="$white3"
                                    borderBottomRightRadius="$10"
                                >
                                    <Paragraph size="$8" color="$white3" fontWeight="bold">
                                        {getInitials(userData?.user.name)}
                                    </Paragraph>
                                </Avatar>

                                <YStack flex={1} alignItems="flex-start" gap="$1">
                                    <Heading size="$3" color="$white3">
                                        {userData?.user.name}
                                    </Heading>
                                    <Paragraph
                                        size="$2"
                                        color="$white3"
                                        backgroundColor="rgba(255, 255, 255, 0.06)"
                                        borderRadius="$4"
                                        p="$1"
                                        px="$3"
                                    >
                                        Level: {getLevel(totalSentencesPracticed?.data || 0)}
                                    </Paragraph>

                                    <XStack gap="$2.5">
                                        <Paragraph size="$2" color="$white3" mt="$1.5">
                                            🔥 {daysPracticedConsecutive?.data || 0} days active
                                            consecutive
                                        </Paragraph>
                                    </XStack>
                                </YStack>
                            </XStack>

                            <Paragraph size="$4" color="$white3" mt="$4" mb="$1">
                                Level Progress:{' '}
                                {getLevelProgressPercentage(totalSentencesPracticed?.data || 0)}%
                            </Paragraph>
                            <YStack gap="$1">
                                <XStack justifyContent="space-between">
                                    <Paragraph size="$2" color="$white3">
                                        {getLevel(totalSentencesPracticed?.data || 0)}
                                    </Paragraph>
                                    <Paragraph size="$2" color="$white3">
                                        Master
                                    </Paragraph>
                                </XStack>
                                <Progress
                                    size="$4"
                                    value={getLevelProgressPercentage(
                                        totalSentencesPracticed?.data || 0
                                    )}
                                    background="$green8"
                                    height={8}
                                >
                                    <Progress.Indicator animation="bouncy" background="$green8" />
                                </Progress>
                            </YStack>
                        </Card>
                    </XStack>
                </LinearGradient>

                <XStack gap="$3" m="$4" flex={1}>
                    <Card
                        size="$4"
                        p="$3"
                        borderRadius="$4"
                        backgroundColor="rgba(255, 255, 255, 0.06)"
                        gap="$4"
                        borderWidth={1}
                        borderColor="rgba(255, 255, 255, 0.09)"
                        alignItems="center"
                        justifyContent="center"
                        flex={1}
                        flexGrow={1}
                        flexShrink={0}
                        minHeight={120}
                    >
                        <Heading size="$2" p="$0" mb="$4" color="$yellow9">
                            {totalSentencesPracticed?.data || 0}
                        </Heading>
                        <Paragraph size="$2" color="$white3">
                            Learned Phrases
                        </Paragraph>
                    </Card>
                    <Card
                        size="$4"
                        p="$3"
                        borderRadius="$4"
                        backgroundColor="rgba(255, 255, 255, 0.06)"
                        gap="$4"
                        borderWidth={1}
                        borderColor="rgba(255, 255, 255, 0.09)"
                        alignItems="center"
                        justifyContent="center"
                        flex={1}
                        flexGrow={1}
                        flexShrink={0}
                        minHeight={120}
                    >
                        <Heading size="$2" p="$0" mb="$4" color="$blue9">
                            {totalVideosWatched?.data || 0}
                        </Heading>
                        <Paragraph size="$2" color="$white3">
                            Videos Watched
                        </Paragraph>
                    </Card>
                    <Card
                        size="$4"
                        p="$3"
                        borderRadius="$4"
                        backgroundColor="rgba(255, 255, 255, 0.06)"
                        gap="$4"
                        borderWidth={1}
                        borderColor="rgba(255, 255, 255, 0.09)"
                        alignItems="center"
                        justifyContent="center"
                        flex={1}
                        flexGrow={1}
                        flexShrink={0}
                        minHeight={120}
                    >
                        <Heading size="$2" p="$0" mb="$4" color="$green9">
                            {totalDaysPracticed?.data || 0}
                        </Heading>
                        <Paragraph size="$2" color="$white3">
                            Study Days
                        </Paragraph>
                    </Card>
                </XStack>

                <Card
                    m="$4"
                    mt="$2"
                    mb="$5"
                    p="$3"
                    borderRadius="$4"
                    backgroundColor="rgba(255, 255, 255, 0.06)"
                    borderWidth={1}
                    borderColor="rgba(255, 255, 255, 0.09)"
                >
                    <Heading size="$4" p="$0" mb="$3">
                        Activity this month
                    </Heading>
                    <YStack gap="$2">
                        {calendario.map((semana, semanaIndex) => (
                            <XStack key={semanaIndex} gap="$2">
                                {semana.map((dia, diaIndex) => {
                                    const isChecked =
                                        dia && parseInt(dia) > 16 && parseInt(dia) < 29;
                                    return (
                                        <Card
                                            key={diaIndex}
                                            size="$2"
                                            p="$2"
                                            borderRadius="$3"
                                            backgroundColor={
                                                dia
                                                    ? isChecked
                                                        ? 'rgba(34, 197, 94, 0.3)'
                                                        : 'rgba(255, 255, 255, 0.06)'
                                                    : 'rgba(255, 255, 255, 0.01)'
                                            }
                                            borderWidth={dia ? 1 : 0}
                                            borderColor="rgba(255, 255, 255, 0.09)"
                                            alignItems="center"
                                            justifyContent="center"
                                            flex={1}
                                            minHeight={40}
                                        >
                                            {dia && (
                                                <Paragraph size="$2" color="$white3">
                                                    {dia}
                                                </Paragraph>
                                            )}
                                        </Card>
                                    );
                                })}
                            </XStack>
                        ))}
                    </YStack>
                </Card>

                <Card
                    m="$4"
                    mt="$0"
                    p="$3"
                    borderRadius="$4"
                    backgroundColor="rgba(255, 255, 255, 0.06)"
                    borderWidth={1}
                    borderColor="rgba(255, 255, 255, 0.09)"
                >
                    <Heading size="$4" p="$0">
                        Settings
                    </Heading>

                    <Button
                        variant="outlined"
                        borderWidth={0}
                        p="$0"
                        my="$3"
                        justifyContent="flex-start"
                        fontSize={'$4'}
                        icon={<Pencil size="$1" />}
                        color="$white5"
                        pressStyle={{
                            opacity: 0.5,
                        }}
                        onPress={() => {
                            router.push('/profile-edit');
                        }}
                    >
                        Edit Profile
                    </Button>
                    <Separator height={0.5} width="100%" />
                    <Button
                        variant="outlined"
                        borderWidth={0}
                        p="$0"
                        my="$3"
                        justifyContent="flex-start"
                        fontSize={'$4'}
                        icon={<HelpCircle size="$1" />}
                        color="$white5"
                        pressStyle={{
                            opacity: 0.5,
                        }}
                        onPress={() => {
                            const email = 'gabriel.leles18@gmail.com';
                            const subject = 'Ajuda com o app';
                            const body = 'Olá, preciso de suporte com...';
                            const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                            Linking.openURL(url).catch((err) =>
                                console.error('Erro ao abrir email:', err)
                            );
                        }}
                    >
                        Help Center
                    </Button>
                    <Separator height={0.5} width="100%" />

                    <Button
                        variant="outlined"
                        borderWidth={0}
                        p="$0"
                        my="$3"
                        justifyContent="flex-start"
                        fontSize={'$4'}
                        icon={<HelpCircle size="$1" />}
                        color="$red8"
                        mb="$0"
                        pressStyle={{
                            opacity: 0.5,
                        }}
                        onPress={() => {
                            dispatch(logout());
                        }}
                    >
                        Logout
                    </Button>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
