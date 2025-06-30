# Estrutura de Modais

Este diretório contém os componentes de modal padronizados da aplicação.

## Componentes

### BaseModal
Componente base para todos os modais da aplicação. Fornece a estrutura comum:
- Overlay com fundo escuro
- Container do modal com bordas arredondadas
- Header com título e botão de fechar opcional
- Área de conteúdo flexível

**Props:**
- `visible: boolean` - Controla a visibilidade do modal
- `title: string` - Título exibido no header
- `children: React.ReactNode` - Conteúdo do modal
- `onClose: () => void` - Função chamada ao fechar o modal
- `showCloseButton?: boolean` - Se deve mostrar o botão X (padrão: true)
- `closeButtonText?: string` - Texto do botão de fechar (padrão: "✕")

### AlertModal
Modal especializado para alertas e confirmações. Usa o BaseModal como base.

**Props:**
- `visible: boolean` - Controla a visibilidade
- `title: string` - Título do alerta
- `message: string` - Mensagem do alerta
- `type?: 'info' | 'success' | 'error' | 'warning'` - Tipo visual do alerta
- `onConfirm?: () => void` - Função chamada ao confirmar
- `onCancel?: () => void` - Função chamada ao cancelar
- `confirmText?: string` - Texto do botão de confirmação
- `cancelText?: string` - Texto do botão de cancelamento
- `showCloseButton?: boolean` - Se deve mostrar botão X no header

## Modais Especializados

### AddClienteModal
Modal para adicionar novos clientes. Usa BaseModal com formulário.

### AddVendaModal
Modal para adicionar novas vendas. Usa BaseModal com formulário.

### VendasModal
Modal para visualizar vendas de um cliente. Usa BaseModal com lista.

## Padrões de Uso

1. **Para formulários**: Use `BaseModal` diretamente
2. **Para alertas/confirmações**: Use `AlertModal`
3. **Para listas/detalhes**: Use `BaseModal` com conteúdo customizado

## Cores por Tipo (AlertModal)

- **info**: Azul (#d1ecf1)
- **success**: Verde (#d4edda)
- **error**: Vermelho (#f8d7da)
- **warning**: Amarelo (#fff3cd)

## Exemplo de Uso

```tsx
// Modal de formulário
<BaseModal
  visible={visible}
  title="Adicionar Cliente"
  onClose={handleClose}
>
  <FormContent />
</BaseModal>

// Modal de alerta
<AlertModal
  visible={errorVisible}
  title="Erro"
  message="Algo deu errado"
  type="error"
  onConfirm={handleConfirm}
  confirmText="OK"
/>
``` 