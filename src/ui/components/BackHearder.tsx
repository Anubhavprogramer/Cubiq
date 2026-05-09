import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Margin, Padding } from "../../utils/spacing";
import ImageViewer from "./ThemedComponents/ImageViewer";
import { useNavigation } from "@react-navigation/native"



const BackHeader = () => {

    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: 40, height: 40, marginBottom: Padding.small, marginLeft: Margin.large }} onPress={() => navigation.goBack()}>
                <ImageViewer source={require('../../assets/images/ChevronUp.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Padding.large,
        paddingVertical: Padding.small,
    },
})

export default BackHeader;