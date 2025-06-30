import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BaseModal from '../BaseModal';
import { AlertModalProps } from './types';
import { styles } from './styles';

export default function AlertModal({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancelar',
  type = 'info',
  showCloseButton = false,
}: AlertModalProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          titleColor: '#155724',
          messageColor: '#155724',
        };
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          titleColor: '#721c24',
          messageColor: '#721c24',
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          titleColor: '#856404',
          messageColor: '#856404',
        };
      default:
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
          titleColor: '#0c5460',
          messageColor: '#0c5460',
        };
    }
  };

  const typeStyles = getTypeStyles();

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    } else if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <BaseModal
      visible={visible}
      title={title}
      onClose={handleClose}
      showCloseButton={showCloseButton}
    >
      <View style={[styles.alertContainer, { backgroundColor: typeStyles.backgroundColor, borderColor: typeStyles.borderColor }]}>
        <Text style={[styles.message, { color: typeStyles.messageColor }]} numberOfLines={10}>
          {message}
        </Text>
        
        <View style={styles.footer}>
          {onCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm || onCancel}
          >
            <Text style={styles.confirmButtonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
} 