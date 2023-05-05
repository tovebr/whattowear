import { View, Text, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../../utils/colors';
import { styles } from './button.styles';

type ButtonProps = {
  title: string;
  loading?: boolean;
  backgroundColor?: string;
  color?: string;
} & TouchableOpacityProps;

export default function Button({
  title,
  loading,
  backgroundColor = colors.darkblue,
  color = 'white',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity {...props} style={[styles.button, { backgroundColor }]}>
      {loading && <ActivityIndicator />}
      {!loading && <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
}
