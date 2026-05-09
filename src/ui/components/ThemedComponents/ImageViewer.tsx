import { Image, StyleSheet, View, ImageSourcePropType } from "react-native";

const ImageViewer: React.FC<{ source: ImageSourcePropType }> = ({ source }) => {
    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default ImageViewer;
