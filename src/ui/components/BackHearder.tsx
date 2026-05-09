import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Margin, Padding } from "../../utils/spacing";
import ImageViewer from "./ThemedComponents/ImageViewer";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "./ThemedComponents/ThemedText";
import { fontSizes } from "../../constants/FontSize";
import { colors } from "../../utils/colors";

const BackHeader = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={{ width: 40, height: 40}} 
                onPress={() => navigation.goBack()}
            >
                <ImageViewer source={require('../../assets/images/ChevronUp.png')} />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Back</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Padding.small,
        paddingVertical: Padding.small,
        width: '100%',
        position: 'absolute',
        top: 50,
        left: 0,
        backgroundColor: colors.background
    },
    title: {
        fontSize: fontSizes.xxlarge,
        fontWeight: 'bold',
    },
});

export default BackHeader;