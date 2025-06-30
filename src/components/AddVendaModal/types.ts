export interface AddVendaModalProps {
  visible: boolean;
  clienteId: number;
  clienteNome: string;
  onSuccess: () => void;
  onClose: () => void;
  isLoading?: boolean;
} 