import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { 
  fetchClientes, 
  setSelectedCliente, 
  clearSelectedCliente,
  createCliente
} from '../store/slices/clientesSlice';
import { 
  fetchVendasPorDia, 
  fetchEstatisticas 
} from '../store/slices/vendasSlice';
import { openModal, closeModal } from '../store/slices/uiSlice';
import ClientesList from '../components/ClientesList';
import EstatisticasCard from '../components/EstatisticasCard';
import VendasChart from '../components/VendasChart';
import AddClienteModal from '../components/AddClienteModal';
import VendasModal from '../components/VendasModal';
import AddVendaModal from '../components/AddVendaModal';
import Shimmer from '../components/Shimmer';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const { clientes, selectedCliente, isLoading: clientesLoading } = useAppSelector((state: any) => state.clientes);
  const { vendasPorDia, estatisticas, isLoading: vendasLoading } = useAppSelector((state: any) => state.vendas);
  const { modals, loading } = useAppSelector((state: any) => state.ui);
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        dispatch(fetchClientes()),
        dispatch(fetchEstatisticas()),
        dispatch(fetchVendasPorDia()),
      ]);
    } finally {
      // Garante que o loading inicial seja removido mesmo se houver erro
      setTimeout(() => setIsInitialLoading(false), 500);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddCliente = () => {
    dispatch(openModal('addCliente'));
  };

  const handleViewVendas = (cliente: any) => {
    dispatch(setSelectedCliente(cliente));
    dispatch(openModal('vendas'));
  };

  const handleAddVenda = () => {
    dispatch(openModal('addVenda'));
  };

  const handleClienteCreated = () => {
    dispatch(closeModal('addCliente'));
    // Não precisa recarregar dados pois o Redux já atualizou o estado
  };

  const getFirstMissingLetter = (nome: string): string => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const nomeLower = nome.toLowerCase();
    
    for (let letter of alphabet) {
      if (!nomeLower.includes(letter)) {
        return letter.toUpperCase();
      }
    }
    return '-';
  };

  const isLoading = clientesLoading || vendasLoading;

  // Mostra shimmer durante o carregamento inicial
  if (isInitialLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.iphoneFrame}>
          <View style={styles.iphoneScreen}>
            <View style={styles.header}>
              <Text style={styles.title}>Loja de Brinquedos</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
              <View style={styles.content}>
                <Shimmer width="100%" height={56} borderRadius={12} style={styles.addButtonShimmer} />
                
                <Shimmer width="100%" height={120} borderRadius={12} style={styles.cardShimmer} />
                <Shimmer width="100%" height={200} borderRadius={12} style={styles.cardShimmer} />
                
                <View style={styles.clientesShimmer}>
                  <Shimmer width="50%" height={20} borderRadius={4} style={styles.titleShimmer} />
                  <Shimmer width="100%" height={56} borderRadius={12} style={styles.searchShimmer} />
                  <Shimmer width="100%" height={120} borderRadius={12} style={styles.cardShimmer} />
                  <Shimmer width="100%" height={120} borderRadius={12} style={styles.cardShimmer} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iphoneFrame}>
        <View style={styles.iphoneScreen}>
          <View style={styles.header}>
            <Text style={styles.title}>Loja de Brinquedos</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={loadData} />
            }
          >
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddCliente}
              >
                <Text style={styles.addButtonText}>+ Adicionar Cliente</Text>
              </TouchableOpacity>

              {estatisticas && (
                <EstatisticasCard estatisticas={estatisticas} isLoading={vendasLoading} />
              )}

              {vendasPorDia.length > 0 && (
                <VendasChart vendasPorDia={vendasPorDia} isLoading={vendasLoading} />
              )}

              <ClientesList
                clientes={clientes}
                getFirstMissingLetter={getFirstMissingLetter}
                onRefresh={() => dispatch(fetchClientes())}
                onViewVendas={handleViewVendas}
                isLoading={clientesLoading}
              />
            </View>
          </ScrollView>
        </View>
      </View>

      <AddClienteModal
        visible={modals.addCliente}
        onClose={() => dispatch(closeModal('addCliente'))}
        onAdd={handleClienteCreated}
        isLoading={loading.addingCliente}
      />

      {selectedCliente && (
        <VendasModal
          visible={modals.vendas}
          onClose={() => {
            dispatch(closeModal('vendas'));
            dispatch(clearSelectedCliente());
          }}
          clienteId={selectedCliente.id}
          clienteNome={selectedCliente.nomeCompleto}
          onAddVenda={handleAddVenda}
        />
      )}

      {selectedCliente && (
        <AddVendaModal
          visible={modals.addVenda}
          clienteId={selectedCliente.id}
          clienteNome={selectedCliente.nomeCompleto}
          onSuccess={() => {
            dispatch(closeModal('addVenda'));
            loadData();
          }}
          onClose={() => dispatch(closeModal('addVenda'))}
          isLoading={loading.addingVenda}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iphoneFrame: {
    width: Math.min(width * 0.9, 375),
    height: Math.min(height * 0.9, 812),
    backgroundColor: '#000',
    borderRadius: 40,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iphoneScreen: {
    flex: 1,
    backgroundColor: '#f4f2ee',
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Roboto',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#7f8c8d',
  },
  addButtonShimmer: {
    marginBottom: 20,
  },
  cardShimmer: {
    marginBottom: 20,
  },
  clientesShimmer: {
    marginTop: 20,
  },
  titleShimmer: {
    marginBottom: 16,
  },
  searchShimmer: {
    marginBottom: 16,
  },
}); 