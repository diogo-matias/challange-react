import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Shimmer from './Shimmer';

interface Estatisticas {
  maiorVolume: {
    cliente: string;
    total: number;
  };
  maiorMedia: {
    cliente: string;
    media: number;
  };
  maiorFrequencia: {
    cliente: string;
    dias: number;
  };
}

interface EstatisticasCardProps {
  estatisticas: Estatisticas;
  isLoading?: boolean;
}

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  highlightCard: {
    backgroundColor: '#e8f5e8',
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statClient: {
    fontSize: 12,
    color: '#34495e',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  titleShimmer: {
    marginBottom: 16,
  },
  statLabelShimmer: {
    marginBottom: 8,
  },
  statValueShimmer: {
    marginBottom: 4,
  },
  statClientShimmer: {
    marginTop: 4,
  },
}); 