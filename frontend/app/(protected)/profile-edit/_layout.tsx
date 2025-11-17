import { Stack } from 'expo-router';

export default function ProfileEditLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}
