import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchVendasByCliente } from '../store/slices/vendasSlice';
import BaseModal from './BaseModal';
import { Venda } from '../store/types';

interface VendasModalProps {
  visible: boolean;
  onClose: () => void;
  clienteId: number;
  clienteNome: string;
  onAddVenda: () => void;
}

export default function VendasModal({
  visible,
  onClose,
  clienteId,
  clienteNome,
  onAddVenda,
}: VendasModalProps) {
  const dispatch = useAppDispatch();
  const { vendas, isLoading } = useAppSelector((state: any) => state.vendas);

  useEffect(() => {
    if (visible && clienteId) {
      dispatch(fetchVendasByCliente(clienteId));
    }
  }, [visible, clienteId, dispatch]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const renderVenda = ({ item }: { item: Venda }) => (
    <View style={styles.vendaItem}>
      <View style={styles.vendaHeader}>
        <Text style={styles.vendaDate}>{formatDate(item.data)}</Text>
        <Text style={styles.vendaValue}>{formatCurrency(item.valor)}</Text>
      </View>
    </View>
  );

  const totalVendas = vendas.reduce((sum: number, venda: Venda) => {
    const valor = typeof venda.valor === 'string' ? parseFloat(venda.valor) : venda.valor;
    return sum + (isNaN(valor) ? 0 : valor);
  }, 0);

  return (
    <BaseModal
      visible={visible}
      title={`Vendas - ${clienteNome}`}
      onClose={onClose}
    >
      <View style={styles.header}>
        <Text style={styles.totalText}>
          Total: {formatCurrency(totalVendas)}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddVenda}>
          <Text style={styles.addButtonText}>+ Nova Venda</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando vendas...</Text>
        </View>
      ) : vendas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma venda encontrada</Text>
        </View>
      ) : (
        <FlatList
          data={vendas}
          renderItem={renderVenda}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      )}
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  list: {
    flex: 1,
  },
  vendaItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  vendaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendaDate: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  vendaValue: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
  },
}); 