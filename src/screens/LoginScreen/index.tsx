import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ValidatedInput from '../../components/ValidatedInput';
import AlertModal from '../../components/AlertModal';
import { validateUsername, validatePassword } from '../../utils/validation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, clearError } from '../../store/slices/authSlice';
import styles from './styles';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      username: validateUsername(form.username) || '',
      password: validatePassword(form.password) || '',
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setErrorModalVisible(true);
      return;
    }

    const result = await dispatch(login(form));
    if (login.rejected.match(result)) {
      setErrorModalVisible(true);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
    dispatch(clearError());
  };

  return (
    <View style={styles.container}>
      <View style={styles.iphoneFrame}>
        <View style={styles.iphoneScreen}>
          <View style={styles.content}>
            <Text style={styles.emoji}>🧸</Text>
            <Text style={styles.title}>Loja de Brinquedos</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            <View style={styles.testCredentials}>
              <Text style={styles.testTitle}>Login teste:</Text>
              <Text style={styles.testText}>Usuário: <Text style={styles.testHighlight}>admin</Text></Text>
              <Text style={styles.testText}>Senha: <Text style={styles.testHighlight}>password</Text></Text>
            </View>

            <ValidatedInput
              label="Usuário"
              placeholder="Digite seu usuário"
              value={form.username}
              onChangeText={(text) => {
                setForm({ ...form, username: text });
                if (errors.username) {
                  setErrors({ ...errors, username: validateUsername(text) || '' });
                }
              }}
              error={errors.username}
              autoCapitalize="none"
            />

            <ValidatedInput
              label="Senha"
              placeholder="Digite sua senha"
              value={form.password}
              onChangeText={(text) => {
                setForm({ ...form, password: text });
                if (errors.password) {
                  setErrors({ ...errors, password: validatePassword(text) || '' });
                }
              }}
              error={errors.password}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AlertModal
        visible={errorModalVisible}
        title="Erro"
        message={error || "Por favor, corrija os erros no formulário"}
        type="error"
        onConfirm={handleCloseErrorModal}
        confirmText="OK"
      />
    </View>
  );
} 