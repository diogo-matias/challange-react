export interface Cliente {
  id: number;
  nomeCompleto: string;
  email: string;
  dataNascimento: string;
  vendas?: Array<{
    data: string;
    valor: number;
  }>;
}

export interface Venda {
  id: number;
  clienteId: number;
  valor: number;
  data: string;
  cliente?: Cliente;
}

export interface Estatisticas {
  maiorVolume: {
    cliente: string;
    total: number;
  };
  maiorMedia: {
    cliente: string;
    media: number;
  };
  maiorFrequencia: {
    cliente: string;
    dias: number;
  };
}

export interface VendaPorDia {
  data: string;
  total: number;
}

export interface AuthState {
  token: string | null;
  user: {
    id: number;
    username: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ClientesState {
  clientes: Cliente[];
  isLoading: boolean;
  error: string | null;
  selectedCliente: Cliente | null;
}

export interface VendasState {
  vendas: Venda[];
  vendasPorDia: VendaPorDia[];
  estatisticas: Estatisticas | null;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  modals: {
    addCliente: boolean;
    addVenda: boolean;
    vendas: boolean;
  };
  loading: {
    addingCliente: boolean;
    addingVenda: boolean;
    updatingCliente: boolean;
    deletingCliente: boolean;
  };
}

export interface CreateClienteData {
  nomeCompleto: string;
  email: string;
  dataNascimento: string;
}

export interface UpdateClienteData {
  id: number;
  nomeCompleto: string;
  email: string;
  dataNascimento: string;
}

export interface CreateVendaData {
  clienteId: number;
  valor: number;
  data: string;
}

export interface LoginData {
  username: string;
  password: string;
} 