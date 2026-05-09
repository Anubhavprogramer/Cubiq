import { StyleSheet, View } from "react-native"
import ThemedText from "../components/ThemedComponents/ThemedText"
import BackHeader from "../components/BackHearder"



const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <BackHeader />
            <ThemedText style={styles.title}>Profile</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default ProfileScreen;