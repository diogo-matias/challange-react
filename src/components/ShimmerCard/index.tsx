import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from './Shimmer';

interface ShimmerCardProps {
  height?: number;
  style?: any;
}

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 16,
  },
  content: {
    marginBottom: 8,
  },
}); 