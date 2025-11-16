import { api } from '@/services/api';
import { Trash } from '@tamagui/lucide-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { TouchableOpacity } from 'react-native';
import { Card, Heading, Paragraph, XStack } from 'tamagui';

interface CardSentenceProps {
    sentence: string;
    translation: string;
    reviewDate: string;
    sentenceId: number;
}

export default function CardSentence({
    sentence,
    translation,
    reviewDate,
    sentenceId,
}: CardSentenceProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete('/sentences/' + id);
            return response.data;
        },
        onSuccess: () => {
            // Invalida todas as queries de sentences para atualizar a lista
            queryClient.invalidateQueries({ queryKey: ['sentences'] });
        },
        onError: (error) => {
            console.error('Erro ao deletar sentença:', error);
        },
    });

    const onPress = () => {
        console.log('onPress');
    };

    const onDelete = () => {
        deleteMutation.mutate(sentenceId);
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
                    <TouchableOpacity
                        onPress={onDelete}
                        disabled={deleteMutation.isPending}
                        style={{ padding: 2, opacity: deleteMutation.isPending ? 0.5 : 1 }}
                    >
                        <Trash size="$1" color="$red10" />
                    </TouchableOpacity>
                </XStack>
            </Card>
        </TouchableOpacity>
    );
}
