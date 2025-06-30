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

export interface EstatisticasCardProps {
  estatisticas: Estatisticas;
  isLoading?: boolean;
} 