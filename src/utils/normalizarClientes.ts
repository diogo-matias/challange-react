import { Cliente } from '../store/types';

export function normalizarClientes(apiResponse: any): Cliente[] {
  // Se já for um array de clientes normalizados, retorna direto
  if (Array.isArray(apiResponse) && apiResponse.length > 0 && typeof apiResponse[0].nomeCompleto === 'string' && typeof apiResponse[0].email === 'string') {
    return apiResponse;
  }

  // Se vier no formato { data: { clientes: [...] } }
  if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data.clientes)) {
    return apiResponse.data.clientes.map((item: any, idx: number) => {
      const info = item.info || {};
      const detalhes = info.detalhes || {};
      const nomeCompleto = info.nomeCompleto || item.duplicado?.nomeCompleto || '';
      const email = detalhes.email || '';
      const dataNascimento = detalhes.nascimento || '';
      const vendas = (item.estatisticas?.vendas || []).map((v: any) => ({
        data: v.data,
        valor: v.valor,
      }));
      const id = item.id || idx + 1;
      return {
        id,
        nomeCompleto,
        email,
        dataNascimento,
        vendas,
      };
    });
  }

  // Se não for nenhum dos formatos esperados, retorna array vazio
  return [];
} 