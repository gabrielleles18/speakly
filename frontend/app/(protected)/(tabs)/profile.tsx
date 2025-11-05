import { HelpCircle, Pencil } from '@tamagui/lucide-icons';
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

export default function ProfileScreen() {
    const theme = useTheme();
    const router = useRouter();

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
                            gap="$4"
                            flex={1}
                            borderWidth={1}
                            borderColor="rgba(255, 255, 255, 0.09)"
                            minHeight={180}
                        >
                            <XStack gap="$4">
                                <Avatar
                                    circular
                                    size="$8"
                                    borderWidth={1}
                                    borderColor="$white3"
                                    borderBottomRightRadius="$10"
                                >
                                    <Avatar.Image
                                        accessibilityLabel="Cam"
                                        src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                                    />
                                    <Avatar.Fallback backgroundColor="$blue10" />
                                </Avatar>

                                <YStack flex={1} alignItems="flex-start" gap="$1">
                                    <Heading size="$3" color="$white3">
                                        John Doe
                                    </Heading>
                                    <Paragraph
                                        size="$2"
                                        color="$white3"
                                        backgroundColor="rgba(255, 255, 255, 0.06)"
                                        borderRadius="$4"
                                        p="$1"
                                        px="$3"
                                    >
                                        Intermediate Level
                                    </Paragraph>

                                    <XStack gap="$2.5">
                                        <Paragraph size="$2" color="$white3" mt="$1.5">
                                            🔥 12 days active
                                        </Paragraph>
                                    </XStack>
                                </YStack>
                            </XStack>

                            <XStack
                                gap="$2.5"
                                alignItems="center"
                                justifyContent="space-between"
                                flex={1}
                            >
                                <Paragraph>Weekly Goal</Paragraph>
                                <Paragraph size="$2" color="$white3">
                                    65%
                                </Paragraph>
                            </XStack>

                            <Progress size="$4" value={7} background="$green8" height={8}>
                                <Progress.Indicator animation="bouncy" background="$green8" />
                            </Progress>
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
                            234
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
                            48
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
                            48
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
                        onPress={() => {}}
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
                            router.push('/login');
                        }}
                    >
                        Logout
                    </Button>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
