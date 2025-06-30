import { TextInputProps } from 'react-native';
 
export interface ValidatedInputProps extends TextInputProps {
  error?: string;
  label?: string;
} 