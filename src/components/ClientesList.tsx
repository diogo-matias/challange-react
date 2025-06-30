import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCliente, deleteCliente } from '../store/slices/clientesSlice';
import { setLoading } from '../store/slices/uiSlice';
import ValidatedInput from './ValidatedInput';
import DatePicker from './DatePicker';
import AlertModal from './AlertModal';
import Shimmer from './Shimmer';
import { validateName, validateEmail, validateDate, formatDateForBackend } from '../utils/validation';
import { Cliente } from '../store/types';

interface ClientesListProps {
  clientes: Cliente[];
  getFirstMissingLetter: (nome: string) => string;
  onRefresh: () => void;
  onViewVendas: (cliente: Cliente) => void;
  isLoading?: boolean;
}

// Função para converter data do backend (YYYY-MM-DD) para frontend (DD/MM/AAAA)
const formatDateForFrontend = (dateString: string): string => {
  if (!dateString) return '';
  
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
  return dateString;
};

export default function ClientesList({
  clientes,
  getFirstMissingLetter,
  onRefresh,
  onViewVendas,
  isLoading,
}: ClientesListProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: any) => state.ui);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    nomeCompleto: '',
    email: '',
    dataNascimento: '',
  });

  const [editErrors, setEditErrors] = useState({
    nomeCompleto: '',
    email: '',
    dataNascimento: '',
  });

  // Estado para controlar quantos clientes mostrar
  const [showAll, setShowAll] = useState(false);

  // Estado para o filtro local
  const [filterText, setFilterText] = useState('');

  // Estados para o modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'error' | 'warning',
    onConfirm: () => {},
    confirmText: 'OK',
    cancelText: 'Cancelar',
    showCancel: false,
  });

  // Filtrar clientes localmente
  const filteredClientes = clientes.filter(cliente => {
    if (!filterText.trim()) return true;
    const searchTerm = filterText.toLowerCase();
    return (
      cliente.nomeCompleto.toLowerCase().includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm)
    );
  });

  // Limitar a exibição a 2 clientes inicialmente
  const displayedClientes = showAll ? filteredClientes : filteredClientes.slice(0, 2);
  const hasMoreClientes = filteredClientes.length > 2;

  const validateEditForm = (): boolean => {
    const newErrors = {
      nomeCompleto: validateName(editForm.nomeCompleto) || '',
      email: validateEmail(editForm.email) || '',
      dataNascimento: validateDate(editForm.dataNascimento) || '',
    };

    setEditErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingId(cliente.id);
    setEditForm({
      nomeCompleto: cliente.nomeCompleto,
      email: cliente.email,
      dataNascimento: formatDateForFrontend(cliente.dataNascimento),
    });
    setEditErrors({
      nomeCompleto: '',
      email: '',
      dataNascimento: '',
    });
  };

  const showModal = (config: typeof modalConfig) => {
    setModalConfig(config);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    if (!editingId) return;

    if (!validateEditForm()) {
      showModal({
        title: 'Erro',
        message: 'Por favor, corrija os erros no formulário',
        type: 'error',
        onConfirm: hideModal,
        confirmText: 'OK',
        cancelText: 'Cancelar',
        showCancel: false,
      });
      return;
    }

    try {
      dispatch(setLoading({ key: 'updatingCliente', value: true }));
      const clienteData = {
        id: editingId,
        nomeCompleto: editForm.nomeCompleto,
        email: editForm.email,
        dataNascimento: formatDateForBackend(editForm.dataNascimento),
      };

      const result = await dispatch(updateCliente(clienteData));
      if (updateCliente.fulfilled.match(result)) {
        setEditingId(null);
        onRefresh();
        showModal({
          title: 'Sucesso',
          message: 'Cliente atualizado com sucesso!',
          type: 'success',
          onConfirm: hideModal,
          confirmText: 'OK',
          cancelText: 'Cancelar',
          showCancel: false,
        });
      } else {
        showModal({
          title: 'Erro',
          message: 'Erro ao atualizar cliente',
          type: 'error',
          onConfirm: hideModal,
          confirmText: 'OK',
          cancelText: 'Cancelar',
          showCancel: false,
        });
      }
    } finally {
      dispatch(setLoading({ key: 'updatingCliente', value: false }));
    }
  };

  const handleDelete = (id: number) => {
    showModal({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este cliente?',
      type: 'warning',
      onConfirm: async () => {
        try {
          dispatch(setLoading({ key: 'deletingCliente', value: true }));
          const result = await dispatch(deleteCliente(id));
          if (deleteCliente.fulfilled.match(result)) {
            hideModal();
            onRefresh();
            showModal({
              title: 'Sucesso',
              message: 'Cliente excluído com sucesso!',
              type: 'success',
              onConfirm: hideModal,
              confirmText: 'OK',
              cancelText: 'Cancelar',
              showCancel: false,
            });
          } else {
            showModal({
              title: 'Erro',
              message: 'Erro ao excluir cliente',
              type: 'error',
              onConfirm: hideModal,
              confirmText: 'OK',
              cancelText: 'Cancelar',
              showCancel: false,
            });
          }
        } finally {
          dispatch(setLoading({ key: 'deletingCliente', value: false }));
        }
      },
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      showCancel: true,
    });
  };

  const handleViewVendas = (cliente: Cliente) => {
    onViewVendas(cliente);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderCliente = ({ item }: { item: Cliente }) => {
    const isEditing = editingId === item.id;
    const missingLetter = getFirstMissingLetter(item.nomeCompleto);

    return (
      <View style={styles.clienteCard}>
        <View style={styles.clienteHeader}>
          <View style={styles.clienteInfo}>
            {isEditing ? (
              <>
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={handleSave}
                    disabled={loading.updatingCliente}
                  >
                    <Text style={styles.actionButtonText}>
                      {loading.updatingCliente ? 'Salvando...' : 'Salvar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => setEditingId(null)}
                    disabled={loading.updatingCliente}
                  >
                    <Text style={styles.actionButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
                <ValidatedInput
                  placeholder="Nome completo"
                  value={editForm.nomeCompleto}
                  onChangeText={(text) => {
                    setEditForm({ ...editForm, nomeCompleto: text });
                    if (editErrors.nomeCompleto) {
                      setEditErrors({ ...editErrors, nomeCompleto: validateName(text) || '' });
                    }
                  }}
                  error={editErrors.nomeCompleto}
                  autoCapitalize="words"
                />
              </>
            ) : (
              <>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => handleViewVendas(item)}
                  >
                    <Text style={styles.actionButtonText}>Vendas</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                    disabled={loading.deletingCliente}
                  >
                    <Text style={styles.actionButtonText}>
                      {loading.deletingCliente ? 'Excluindo...' : 'Excluir'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.clienteNome}>{item.nomeCompleto}</Text>
              </>
            )}
            <View style={styles.missingLetterContainer}>
              <Text style={styles.missingLetterLabel}>Letra faltante:</Text>
              <Text style={styles.missingLetter}>{missingLetter}</Text>
            </View>
          </View>
        </View>

        <View style={styles.clienteDetails}>
          {isEditing ? (
            <>
              <ValidatedInput
                placeholder="Email"
                value={editForm.email}
                onChangeText={(text) => {
                  setEditForm({ ...editForm, email: text });
                  if (editErrors.email) {
                    setEditErrors({ ...editErrors, email: validateEmail(text) || '' });
                  }
                }}
                error={editErrors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <DatePicker
                  value={editForm.dataNascimento}
                  onChange={(date) => {
                    setEditForm({ ...editForm, dataNascimento: date });
                    if (editErrors.dataNascimento) {
                      setEditErrors({ ...editErrors, dataNascimento: validateDate(date) || '' });
                    }
                  }}
                  error={editErrors.dataNascimento}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.clienteDetail}>
                <Text style={styles.detailLabel}>Email:</Text> {item.email}
              </Text>
              <Text style={styles.clienteDetail}>
                <Text style={styles.detailLabel}>Nascimento:</Text>{' '}
                {new Date(item.dataNascimento).toLocaleDateString('pt-BR')}
              </Text>
              <Text style={styles.clienteDetail}>
                <Text style={styles.detailLabel}>Total de vendas:</Text>{' '}
                {item.vendas?.length || 0}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  };

  const renderShimmerCliente = () => (
    <View style={styles.clienteCard}>
      <View style={styles.clienteHeader}>
        <View style={styles.clienteInfo}>
          <Shimmer width="70%" height={18} borderRadius={4} style={styles.nomeShimmer} />
          <View style={styles.missingLetterContainer}>
            <Shimmer width="60%" height={12} borderRadius={4} />
          </View>
        </View>
      </View>
      <View style={styles.clienteDetails}>
        <Shimmer width="80%" height={14} borderRadius={4} style={styles.detailShimmer} />
        <Shimmer width="60%" height={14} borderRadius={4} style={styles.detailShimmer} />
        <Shimmer width="50%" height={14} borderRadius={4} style={styles.detailShimmer} />
      </View>
    </View>
  );

  const renderShimmerList = () => (
    <View style={styles.container}>
      <Shimmer width="50%" height={20} borderRadius={4} style={styles.titleShimmer} />
      <Shimmer width="100%" height={56} borderRadius={12} style={styles.searchShimmer} />
      {[1, 2].map((_, index) => (
        <View key={index}>
          {renderShimmerCliente()}
        </View>
      ))}
    </View>
  );

  if (isLoading) {
    return renderShimmerList();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes ({filteredClientes.length})</Text>
      
      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome ou email..."
          value={filterText}
          onChangeText={setFilterText}
          placeholderTextColor="#95a5a6"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {filterText ? (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setFilterText('')}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={displayedClientes}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      
      {hasMoreClientes && (
        <TouchableOpacity style={styles.verMaisButton} onPress={toggleShowAll}>
          <Text style={styles.verMaisText}>
            {showAll ? 'Ver menos' : `Ver mais (${filteredClientes.length - 2} restantes)`}
          </Text>
        </TouchableOpacity>
      )}
      
      <AlertModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.showCancel ? hideModal : undefined}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  clienteCard: {
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
  clienteHeader: {
    marginBottom: 12,
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 8,
  },
  missingLetterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missingLetterLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 4,
  },
  missingLetter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#3498db',
  },
  editButton: {
    backgroundColor: '#f39c12',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  clienteDetails: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
  },
  clienteDetail: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  dateContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  verMaisButton: {
    backgroundColor: '#3498db',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  verMaisText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  nomeShimmer: {
    marginBottom: 8,
  },
  detailShimmer: {
    marginBottom: 4,
  },
  titleShimmer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    color: '#2c3e50',
    fontFamily: 'Roboto',
  },
  clearButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  searchShimmer: {
    marginBottom: 16,
  },
}); 