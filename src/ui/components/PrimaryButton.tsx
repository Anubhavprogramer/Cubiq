import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '../../utils/colors';
import { BorderRadius, Padding } from '../../utils/spacing';

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
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default PrimaryButton;