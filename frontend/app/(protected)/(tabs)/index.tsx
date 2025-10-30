import { StyleSheet, View } from 'react-native';
import { Button } from 'tamagui';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Button onPress={() => router.push('/login')}>Login</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
