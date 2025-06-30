import React from 'react';
import { View, Text } from 'react-native';
import Shimmer from '../Shimmer';
import { Estatisticas, EstatisticasCardProps } from './types';
import { styles } from './styles';

export default function EstatisticasCard({ estatisticas, isLoading = false }: EstatisticasCardProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Shimmer width="40%" height={18} borderRadius={4} style={styles.titleShimmer} />
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.highlightCard]}>
            <Shimmer width="60%" height={14} borderRadius={4} style={styles.statLabelShimmer} />
            <Shimmer width="40%" height={20} borderRadius={4} style={styles.statValueShimmer} />
            <Shimmer width="80%" height={12} borderRadius={4} style={styles.statClientShimmer} />
          </View>

          <View style={styles.statCard}>
            <Shimmer width="60%" height={14} borderRadius={4} style={styles.statLabelShimmer} />
            <Shimmer width="40%" height={20} borderRadius={4} style={styles.statValueShimmer} />
            <Shimmer width="80%" height={12} borderRadius={4} style={styles.statClientShimmer} />
          </View>

          <View style={styles.statCard}>
            <Shimmer width="60%" height={14} borderRadius={4} style={styles.statLabelShimmer} />
            <Shimmer width="40%" height={20} borderRadius={4} style={styles.statValueShimmer} />
            <Shimmer width="80%" height={12} borderRadius={4} style={styles.statClientShimmer} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destaques</Text>
      
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, styles.highlightCard]}>
          <Text style={styles.statLabel}>Maior Volume</Text>
          <Text style={styles.statValue}>
            {estatisticas.maiorVolume?.total || 0} vendas
          </Text>
          <Text style={styles.statClient}>
            {estatisticas.maiorVolume?.cliente || 'N/A'}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Maior Média</Text>
          <Text style={styles.statValue}>
            R$ {estatisticas.maiorMedia?.media?.toFixed(2) || '0,00'}
          </Text>
          <Text style={styles.statClient}>
            {estatisticas.maiorMedia?.cliente || 'N/A'}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Maior Frequência</Text>
          <Text style={styles.statValue}>
            {estatisticas.maiorFrequencia?.dias || 0} dias
          </Text>
          <Text style={styles.statClient}>
            {estatisticas.maiorFrequencia?.cliente || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
} 