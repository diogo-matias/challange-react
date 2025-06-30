import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BaseModal from './BaseModal';

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  showCloseButton?: boolean;
}

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

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    padding: 20,
    minHeight: 120,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    flexShrink: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  confirmButton: {
    backgroundColor: '#007bff',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 