import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createVenda } from '../../store/slices/vendasSlice';
import { setLoading } from '../../store/slices/uiSlice';
import BaseModal from '../BaseModal';
import AlertModal from '../AlertModal';
import ValidatedInput from '../ValidatedInput';
import DatePicker from '../DatePicker';
import { validateValue, validateDate, formatDateForBackend } from '../../utils/validation';
import { CreateVendaData } from '../../store/types';
import { AddVendaModalProps } from './types';
import { styles } from './styles';

export default function AddVendaModal({ visible, clienteId, clienteNome, onSuccess, onClose, isLoading = false }: AddVendaModalProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: any) => state.ui);

  const [form, setForm] = useState({
    valor: '',
    data: '',
  });

  const [errors, setErrors] = useState({
    valor: '',
    data: '',
  });

  // Estados para os modais
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [apiErrorModalVisible, setApiErrorModalVisible] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      valor: validateValue(form.valor) || '',
      data: validateDate(form.data) || '',
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
      dispatch(setLoading({ key: 'addingVenda', value: true }));
      const vendaData: CreateVendaData = {
        clienteId,
        valor: parseFloat(form.valor),
        data: formatDateForBackend(form.data),
      };

      const result = await dispatch(createVenda(vendaData));
      if (createVenda.fulfilled.match(result)) {
        setSuccessModalVisible(true);
        handleClose();
        onSuccess();
      } else {
        setApiErrorModalVisible(true);
      }
    } finally {
      dispatch(setLoading({ key: 'addingVenda', value: false }));
    }
  };

  const handleClose = () => {
    setForm({
      valor: '',
      data: '',
    });
    setErrors({
      valor: '',
      data: '',
    });
    onClose();
  };

  const isSubmitting = loading.addingVenda || isLoading;

  return (
    <>
      <BaseModal
        visible={visible}
        title="Adicionar Venda"
        onClose={handleClose}
      >
        <Text style={styles.clienteInfo}>Cliente: {clienteNome}</Text>

        <ValidatedInput
          label="Valor (R$)"
          placeholder="0,00"
          value={form.valor}
          onChangeText={(text) => {
            setForm({ ...form, valor: text });
            if (errors.valor) {
              setErrors({ ...errors, valor: validateValue(text) || '' });
            }
          }}
          error={errors.valor}
          keyboardType="numeric"
        />

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Data da Venda</Text>
          <DatePicker
            value={form.data}
            onChange={(date) => {
              setForm({ ...form, data: date });
              if (errors.data) {
                setErrors({ ...errors, data: validateDate(date) || '' });
              }
            }}
            error={errors.data}
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

      <AlertModal
        visible={successModalVisible}
        title="Sucesso"
        message="Venda adicionada com sucesso!"
        type="success"
        onConfirm={() => setSuccessModalVisible(false)}
        confirmText="OK"
      />

      <AlertModal
        visible={apiErrorModalVisible}
        title="Erro"
        message="Erro ao adicionar venda"
        type="error"
        onConfirm={() => setApiErrorModalVisible(false)}
        confirmText="OK"
      />
    </>
  );
} 