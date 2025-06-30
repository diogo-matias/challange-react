import { normalizarClientes } from '../normalizarClientes';

describe('normalizarClientes', () => {
  it('normaliza corretamente o exemplo do requisito', () => {
    const apiResponse = {
      data: {
        clientes: [
          {
            info: {
              nomeCompleto: 'Ana Beatriz',
              detalhes: {
                email: 'ana.b@example.com',
                nascimento: '1992-05-01',
              },
            },
            estatisticas: {
              vendas: [
                { data: '2024-01-01', valor: 150 },
                { data: '2024-01-02', valor: 50 },
              ],
            },
          },
          {
            info: {
              nomeCompleto: 'Carlos Eduardo',
              detalhes: {
                email: 'cadu@example.com',
                nascimento: '1987-08-15',
              },
            },
            duplicado: {
              nomeCompleto: 'Carlos Eduardo',
            },
            estatisticas: {
              vendas: [],
            },
          },
        ],
      },
      meta: {
        registroTotal: 2,
        pagina: 1,
      },
      redundante: {
        status: 'ok',
      },
    };

    const resultado = normalizarClientes(apiResponse);
    expect(resultado).toEqual([
      {
        id: 1,
        nomeCompleto: 'Ana Beatriz',
        email: 'ana.b@example.com',
        dataNascimento: '1992-05-01',
        vendas: [
          { data: '2024-01-01', valor: 150 },
          { data: '2024-01-02', valor: 50 },
        ],
      },
      {
        id: 2,
        nomeCompleto: 'Carlos Eduardo',
        email: 'cadu@example.com',
        dataNascimento: '1987-08-15',
        vendas: [],
      },
    ]);
  });
}); 