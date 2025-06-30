import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Shimmer from './Shimmer';

interface VendaPorDia {
  data: string;
  total: number;
}

interface VendasChartProps {
  vendasPorDia: VendaPorDia[];
  isLoading?: boolean;
}

const { width } = Dimensions.get('window');

export default function VendasChart({ vendasPorDia, isLoading = false }: VendasChartProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Shimmer width="40%" height={18} borderRadius={4} style={styles.titleShimmer} />
        
        <View style={styles.chartContainer}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <Shimmer 
                  width={20} 
                  height={Math.random() * 100 + 50} 
                  borderRadius={4} 
                  style={styles.barShimmer} 
                />
              </View>
              <Shimmer width="80%" height={10} borderRadius={4} style={styles.labelShimmer} />
              <Shimmer width="60%" height={10} borderRadius={4} style={styles.valueShimmer} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (!vendasPorDia || vendasPorDia.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vendas por Dia</Text>
        <Text style={styles.noData}>Nenhuma venda registrada</Text>
      </View>
    );
  }

  const maxValor = Math.max(...vendasPorDia.map(v => v.total));
  const chartHeight = 150;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendas por Dia</Text>
      
      <View style={styles.chartContainer}>
        {vendasPorDia.map((venda, index) => {
          const barHeight = maxValor > 0 ? (venda.total / maxValor) * chartHeight : 0;
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { height: barHeight }
                  ]} 
                />
              </View>
              <Text style={styles.barLabel}>{formatDate(venda.data)}</Text>
              <Text style={styles.barValue}>{formatCurrency(venda.total)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  noData: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
    fontStyle: 'italic',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 150,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    minHeight: 4,
    width: 20,
  },
  barLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#2c3e50',
    fontWeight: '600',
    textAlign: 'center',
  },
  titleShimmer: {
    marginBottom: 16,
  },
  barShimmer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  labelShimmer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  valueShimmer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
}); 