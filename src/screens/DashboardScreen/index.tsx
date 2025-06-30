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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { 
  fetchClientes, 
  setSelectedCliente, 
  clearSelectedCliente,
  createCliente
} from '../../store/slices/clientesSlice';
import { 
  fetchVendasPorDia, 
  fetchEstatisticas 
} from '../../store/slices/vendasSlice';
import { openModal, closeModal } from '../../store/slices/uiSlice';
import ClientesList from '../../components/ClientesList';
import EstatisticasCard from '../../components/EstatisticasCard';
import VendasChart from '../../components/VendasChart';
import AddClienteModal from '../../components/AddClienteModal';
import VendasModal from '../../components/VendasModal';
import AddVendaModal from '../../components/AddVendaModal';
import Shimmer from '../../components/Shimmer';
import styles from './styles';

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

  if (isInitialLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.iphoneFrame}>
          <View style={styles.iphoneScreen}>
            <View style={styles.header}>
              <View style={styles.headerCenter}>
                <Text style={styles.title}>Loja de Brinquedos</Text>
              </View>
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
            <View style={styles.headerCenter}>
              <Text style={styles.bear}>🧸</Text>
              <Text style={styles.title}>Loja de Brinquedos</Text>
            </View>
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
                onRefresh={loadData}
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