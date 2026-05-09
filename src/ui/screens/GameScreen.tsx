import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../components/ThemedComponents/ThemedText";
import { AppStrings } from "../../constants/AppStrings";
import { colors } from "../../utils/colors";



export const GameScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>{AppStrings.AppTitle}</ThemedText>
        <ThemedText style={styles.instructions}>{AppStrings.instructions}</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  instructions: {
    fontSize: 16,
    color: colors.text,
  },
});
