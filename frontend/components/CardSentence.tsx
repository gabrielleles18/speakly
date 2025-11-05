import { Trash } from '@tamagui/lucide-icons';
import { Card, Heading, Paragraph, XStack } from 'tamagui';

export default function CardSentence() {
    return (
        <Card
            p="$3"
            borderRadius="$4"
            backgroundColor="rgba(255, 255, 255, 0.06)"
            borderWidth={1}
            borderColor="rgba(255, 255, 255, 0.09)"
        >
            <Heading size="$4" p="$0" color="$white3" gap="$0">
                Table for two, please.
            </Heading>
            <Paragraph color="$white9">Mesa para dois, por favor.</Paragraph>

            <XStack alignItems="center" gap="$1" justifyContent="space-between" mt="$2">
                <Paragraph size="$2" color="$white11">
                    Revisar amanhã
                </Paragraph>
                <Trash size="$1" color="$red10" />
            </XStack>
        </Card>
    );
}
