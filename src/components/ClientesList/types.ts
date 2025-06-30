import { Cliente } from '../../store/types';

export interface ClientesListProps {
  clientes: Cliente[];
  getFirstMissingLetter: (nome: string) => string;
  onRefresh: () => void;
  onViewVendas: (cliente: Cliente) => void;
  isLoading?: boolean;
} 