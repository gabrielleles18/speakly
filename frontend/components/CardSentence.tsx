import { Trash } from '@tamagui/lucide-icons';
import dayjs from 'dayjs';
import { TouchableOpacity } from 'react-native';
import { Card, Heading, Paragraph, XStack } from 'tamagui';

interface CardSentenceProps {
    sentence: string;
    translation: string;
    reviewDate: string;
}

export default function CardSentence({ sentence, translation, reviewDate }: CardSentenceProps) {
    const onPress = () => {
        console.log('onPress');
    };

    const onDelete = () => {
        console.log('onDelete');
    };

    const getReviewText = () => {
        const today = dayjs().startOf('day');

        // Tenta converter a data, se estiver no formato DD/MM/YYYY, converte para YYYY-MM-DD
        let review = dayjs(reviewDate);

        // Se a data não for válida, tenta converter do formato DD/MM/YYYY
        if (!review.isValid() && reviewDate.includes('/')) {
            const parts = reviewDate.split('/');
            if (parts.length === 3) {
                // DD/MM/YYYY -> YYYY-MM-DD
                const [day, month, year] = parts;
                review = dayjs(`${year}-${month}-${day}`).startOf('day');
            }
        } else {
            review = review.startOf('day');
        }

        if (!review.isValid()) {
            return 'Data inválida';
        }

        const diffDays = review.diff(today, 'day');

        if (diffDays === 0) {
            return 'Revisar hoje';
        } else if (diffDays === 1) {
            return 'Revisar amanhã';
        } else if (diffDays > 1) {
            return `Revisar em ${diffDays} dias`;
        } else {
            // Data no passado
            return 'Revisar hoje';
        }
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <Card
                p="$3"
                borderRadius="$4"
                backgroundColor="rgba(255, 255, 255, 0.06)"
                borderWidth={1}
                borderColor="rgba(255, 255, 255, 0.09)"
            >
                <Heading size="$4" p="$0" color="$white3" gap="$0">
                    {sentence}
                </Heading>
                <Paragraph color="$white9">{translation}</Paragraph>

                <XStack alignItems="center" gap="$1" justifyContent="space-between" mt="$2">
                    <Paragraph size="$2" color="$white11">
                        {getReviewText()}
                    </Paragraph>
                    <TouchableOpacity onPress={onDelete} style={{ padding: 2 }}>
                        <Trash size="$1" color="$red10" />
                    </TouchableOpacity>
                </XStack>
            </Card>
        </TouchableOpacity>
    );
}
