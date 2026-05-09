import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { Dimensions, StatusBar, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { Margin, Padding } from '../../utils/spacing';

const {width} = Dimensions.get('window');

const GRID_SIZE = width * 0.75;
const CELL_SIZE = GRID_SIZE / 4;

const LandingScreen = ({navigation}: any) => {
 

  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.topSection}>
        <View style={styles.badgeContainer}>
          <View style={styles.badge} />
          <Text style={styles.logo}>Cubiq</Text>
        </View>

        <Text style={styles.title}>
          Train Your Brain{`\n`}One Patch At A Time
        </Text>

        <Text style={styles.subtitle}>
          Solve infinite procedural puzzles by creating perfect number patches.
        </Text>
      </View>

      <View style={styles.previewContainer}>
        this is Grid preview
      </View>

      <View style={styles.bottomSection}>
        <PrimaryButton
          title="Start Playing"
          onPress={() => navigation.navigate('Game')}
        />

        <Text style={styles.footerText}>
          Endless Levels • Relaxing Gameplay • Smart Puzzles
        </Text>
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
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Margin.xlarge,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: Margin.xsmall,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title: {
    fontSize: 32,
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