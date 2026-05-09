import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AppStrings } from "../../constants/AppStrings"
import ThemedText from "./ThemedComponents/ThemedText"
import ImageViewer from "./ThemedComponents/ImageViewer"
import { fontSizes } from "../../constants/FontSize"
import { Margin, Padding } from "../../utils/spacing"

const Header = () => {
    const navigation = useNavigation<any>();
    
    return (
        <View style={styles.container}>
            <View style={{ width: 40, height: 40, marginBottom: Padding.small }}>
                <ImageViewer source={require('../../assets/images/Logo.png')} />
            </View>
            <View>
                <ThemedText style={styles.title}>{AppStrings.AppTitle}</ThemedText>
                <ThemedText style={styles.instructions}>{AppStrings.instructions}</ThemedText>
            </View>
            <TouchableOpacity style={{ width: 40, height: 40, marginBottom: Padding.small, marginLeft: Margin.large }} onPress={() => navigation.navigate('Profile')}>
                <ImageViewer source={require('../../assets/images/Analytics.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Padding.medium,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
    },
    title: {
        fontSize: fontSizes.xxlarge,
        fontWeight: 'bold',
    },
    instructions: {
        fontSize: fontSizes.medium,
        marginTop: Margin.xsmall,
    },
})

export default Header;