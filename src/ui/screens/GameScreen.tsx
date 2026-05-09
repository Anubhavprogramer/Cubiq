import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../components/ThemedComponents/ThemedText";
import { AppStrings } from "../../constants/AppStrings";
import { colors } from "../../utils/colors";
import Header from "../components/Header";



export const GameScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
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
