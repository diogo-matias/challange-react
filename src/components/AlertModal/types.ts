export interface AlertModalProps {
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