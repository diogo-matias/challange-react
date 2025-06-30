export interface VendaPorDia {
  data: string;
  total: number;
}
 
export interface VendasChartProps {
  vendasPorDia: VendaPorDia[];
  isLoading?: boolean;
} 