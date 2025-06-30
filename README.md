# 🧸 Loja de Brinquedos - Frontend

Um sistema de gerenciamento para loja de brinquedos desenvolvido com React Native/Expo, oferecendo uma interface moderna e responsiva para controle de clientes e vendas.

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema de login seguro com validação de credenciais
- Persistência de sessão com AsyncStorage
- Proteção de rotas autenticadas
- Logout automático em caso de token expirado

### 👥 Gestão de Clientes
- **Listagem de clientes** com design moderno e responsivo
- **Adicionar novos clientes** com validação de dados
- **Visualizar histórico de vendas** por cliente
- **Busca e filtros** para facilitar a localização
- **Indicador visual** da primeira letra que falta no nome do cliente

### 📊 Dashboard e Estatísticas
- **Cards de estatísticas** em tempo real:
  - Cliente com maior volume de vendas
  - Cliente com maior média de compras
  - Cliente com maior frequência de compras
- **Gráfico de vendas** por dia com visualização interativa
- **Pull-to-refresh** para atualizar dados
- **Loading states** com efeitos shimmer

### 💰 Gestão de Vendas
- **Registrar novas vendas** por cliente
- **Visualizar histórico** detalhado de vendas
- **Filtros por data** para análise temporal
- **Validação de dados** em tempo real

### 🎨 Interface e UX
- **Design responsivo** que se adapta a diferentes tamanhos de tela
- **Frame iPhone** para simular experiência mobile
- **Animações e transições** suaves
- **Modais intuitivos** para ações principais
- **Feedback visual** para todas as interações
- **Estados de loading** com shimmer effects

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** (0.72.10) - Framework mobile
- **Expo** (49.0.15) - Plataforma de desenvolvimento
- **TypeScript** (5.1.3) - Tipagem estática
- **React** (18.2.0) - Biblioteca de interface

### Gerenciamento de Estado
- **Redux Toolkit** (2.8.2) - Gerenciamento de estado global
- **React Redux** (9.2.0) - Integração React-Redux

### Navegação e Armazenamento
- **AsyncStorage** (1.18.2) - Persistência local de dados
- **Axios** (1.5.0) - Cliente HTTP para APIs

### Desenvolvimento
- **Babel** (7.20.0) - Transpilador JavaScript
- **Webpack** (via Expo) - Bundler
- **React Native Web** (0.19.6) - Suporte para web

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd challange-react
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```
Edite o arquivo `.env` com a URL da sua API:
```
BASE_URL=https://sua-api-backend.com
```

4. **Execute o projeto**

Para desenvolvimento local:
```bash
npm start
```

Para diferentes plataformas:
```bash
# Web
npm run web

# Android
npm run android

# iOS
npm run ios
```

### Build para Produção

Para gerar build web:
```bash
npm run build:web
```

## 📱 Credenciais de Teste

Para testar o sistema, utilize as seguintes credenciais:

- **Usuário:** `admin`
- **Senha:** `password`

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AddClienteModal.tsx
│   ├── AddVendaModal.tsx
│   ├── AlertModal.tsx
│   ├── ClientesList.tsx
│   ├── EstatisticasCard.tsx
│   ├── VendasChart.tsx
│   └── ...
├── screens/            # Telas principais
│   ├── DashboardScreen.tsx
│   └── LoginScreen.tsx
├── store/              # Gerenciamento de estado (Redux)
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── clientesSlice.ts
│   │   ├── vendasSlice.ts
│   │   └── uiSlice.ts
│   ├── hooks.ts
│   ├── index.ts
│   └── types.ts
├── services/           # Serviços externos
│   └── api.ts
├── utils/              # Utilitários
│   └── validation.ts
└── styles/             # Estilos globais
```

## 🔧 Configurações

### Variáveis de Ambiente
- `BASE_URL`: URL base da API backend (padrão: https://challange-react-backend.onrender.com)

### Scripts Disponíveis
- `npm start` - Inicia o servidor de desenvolvimento
- `npm run web` - Executa no navegador
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run build` - Gera build de produção para web

## 🎯 Características Técnicas

### Performance
- **Lazy loading** de componentes
- **Otimização de re-renders** com React.memo
- **Gerenciamento eficiente de estado** com Redux Toolkit
- **Cache inteligente** de requisições

### Segurança
- **Validação de entrada** em tempo real
- **Sanitização de dados** antes do envio
- **Interceptors HTTP** para tratamento de erros
- **Autenticação baseada em token**

### Acessibilidade
- **Labels semânticos** para inputs
- **Contraste adequado** de cores
- **Navegação por teclado** (web)
- **Feedback auditivo** para ações

---

Desenvolvido com ❤️ usando React Native e Expo 
