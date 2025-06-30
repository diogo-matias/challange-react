import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createCliente } from '../store/slices/clientesSlice';
import { setLoading } from '../store/slices/uiSlice';
import BaseModal from './BaseModal';
import AlertModal from './AlertModal';
import ValidatedInput from './ValidatedInput';
import DatePicker from './DatePicker';
import { validateName, validateEmail, validateDate, formatDateForBackend } from '../utils/validation';
import { CreateClienteData } from '../store/types';

interface AddClienteModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  isLoading?: boolean;
}

export default function AddClienteModal({ visible, onClose, onAdd, isLoading = false }: AddClienteModalProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: any) => state.ui);

  const [form, setForm] = useState({
    nomeCompleto: '',
    email: '',
    dataNascimento: '',
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    email: '',
    dataNascimento: '',
  });

  // Estado para o modal de erro
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      nomeCompleto: validateName(form.nomeCompleto) || '',
      email: validateEmail(form.email) || '',
      dataNascimento: validateDate(form.dataNascimento) || '',
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setErrorModalVisible(true);
      return;
    }

    try {
      dispatch(setLoading({ key: 'addingCliente', value: true }));
      const clienteData = {
        ...form,
        dataNascimento: formatDateForBackend(form.dataNascimento),
      };

      const result = await dispatch(createCliente(clienteData));
      if (createCliente.fulfilled.match(result)) {
        handleClose();
        onAdd(); // Chama apenas o callback, não faz nova requisição
      } else {
        setErrorModalVisible(true);
      }
    } finally {
      dispatch(setLoading({ key: 'addingCliente', value: false }));
    }
  };

  const handleClose = () => {
    setForm({
      nomeCompleto: '',
      email: '',
      dataNascimento: '',
    });
    setErrors({
      nomeCompleto: '',
      email: '',
      dataNascimento: '',
    });
    onClose();
  };

  const isSubmitting = loading.addingCliente || isLoading;

  return (
    <>
      <BaseModal
        visible={visible}
        title="Adicionar Cliente"
        onClose={handleClose}
      >
        <ValidatedInput
          label="Nome Completo"
          placeholder="Digite o nome completo"
          value={form.nomeCompleto}
          onChangeText={(text) => {
            setForm({ ...form, nomeCompleto: text });
            if (errors.nomeCompleto) {
              setErrors({ ...errors, nomeCompleto: validateName(text) || '' });
            }
          }}
          error={errors.nomeCompleto}
          autoCapitalize="words"
        />

        <ValidatedInput
          label="Email"
          placeholder="Digite o email"
          value={form.email}
          onChangeText={(text) => {
            setForm({ ...form, email: text });
            if (errors.email) {
              setErrors({ ...errors, email: validateEmail(text) || '' });
            }
          }}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <DatePicker
            value={form.dataNascimento}
            onChange={(date) => {
              setForm({ ...form, dataNascimento: date });
              if (errors.dataNascimento) {
                setErrors({ ...errors, dataNascimento: validateDate(date) || '' });
              }
            }}
            error={errors.dataNascimento}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose} disabled={isSubmitting}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={styles.addButtonText}>
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </BaseModal>

      <AlertModal
        visible={errorModalVisible}
        title="Erro"
        message="Por favor, corrija os erros no formulário"
        type="error"
        onConfirm={() => setErrorModalVisible(false)}
        confirmText="OK"
      />
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    padding: 16,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 