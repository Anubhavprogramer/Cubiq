import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '../../utils/colors';
import { BorderRadius, Padding } from '../../utils/spacing';
import { fontSizes } from '../../constants/FontSize';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const PrimaryButton: React.FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: Padding.medium,
    paddingHorizontal: Padding.large,
    borderRadius: BorderRadius.xlarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.whiteText,
    fontFamily: 'Jersey25-Regular',
    fontSize: fontSizes.xxlargePlus,
    fontWeight: '700',
  },
});

export default PrimaryButton;