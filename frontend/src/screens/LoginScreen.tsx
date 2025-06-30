import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ValidatedInput from '../components/ValidatedInput';
import AlertModal from '../components/AlertModal';
import { validateUsername, validatePassword } from '../utils/validation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, clearError } from '../store/slices/authSlice';

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
            <Text style={styles.title}>Loja de Brinquedos</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#fff',
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Roboto',
  },
  loginButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 