import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { Dimensions, StatusBar, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { BorderRadius, Margin, Padding, Spacing } from '../../utils/spacing';
import ThemedText from '../components/ThemedComponents/ThemedText';
import { fontSizes } from '../../constants/FontSize';

const {width} = Dimensions.get('window');

const GRID_SIZE = width * 0.75;
const CELL_SIZE = GRID_SIZE / 4;

const LandingScreen = ({navigation}: any) => {
 

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
      </View>

      <View style={styles.previewContainer}>
        this is Grid preview
      </View>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Start Playing"
          onPress={() => navigation.navigate('Game')}
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
  title: {
    fontSize: fontSizes.landingFont,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Margin.small,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
  grid: {
    width: GRID_SIZE,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
  footerText: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
});

export default LandingScreen;