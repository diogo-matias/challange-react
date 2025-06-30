import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ValidatedInputProps } from './types';
import { styles } from './styles';

export default function ValidatedInput({ error, label, style, ...props }: ValidatedInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style,
        ]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
} 