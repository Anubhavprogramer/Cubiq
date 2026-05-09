import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/colors';
import { BorderRadius, Margin, Padding, Spacing } from '../../utils/spacing';
import ThemedText from '../components/ThemedComponents/ThemedText';
import { fontSizes } from '../../constants/FontSize';
import ImageViewer from '../components/ThemedComponents/ImageViewer';

const LandingScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.topSection}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge} />
          <ThemedText style={styles.logo}>Cubiq</ThemedText>
        </View>
        </View>

      <View style={styles.middleSection}>
        <ThemedText style={styles.title}>
          CUBIQ
        </ThemedText>
        <View style={styles.LogoCard}>
          <ImageViewer source={require('../../assets/images/Logo.png')} />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Start Playing"
          onPress={() => navigation.push('Game')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: Padding.large,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'flex-start',
    marginBottom: Margin.xlarge,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
  badge: {
    width: Spacing.small,
    height: Spacing.small,
    borderRadius: BorderRadius.small,
    backgroundColor: colors.primary,
    marginRight: Margin.xsmall,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  middleSection: {
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
  LogoCard: {
    width: 200,
    height: 200,
    borderRadius: BorderRadius.small,
    overflow: 'hidden',
  },
  title: {
    fontSize: fontSizes.landingFont,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Margin.xxlarge,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
});

export default LandingScreen;