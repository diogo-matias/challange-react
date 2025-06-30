import React from 'react';
import { View } from 'react-native';
import Shimmer from '../Shimmer';
import { ShimmerCardProps } from './types';
import { styles } from './styles';

export default function ShimmerCard({ height = 120, style }: ShimmerCardProps) {
  return (
    <View style={[styles.card, { height }, style]}>
      <Shimmer width="60%" height={16} borderRadius={4} style={styles.title} />
      <Shimmer width="40%" height={14} borderRadius={4} style={styles.subtitle} />
      <Shimmer width="80%" height={14} borderRadius={4} style={styles.content} />
      <Shimmer width="50%" height={14} borderRadius={4} style={styles.content} />
    </View>
  );
} 