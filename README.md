# ReactFlix 🎬

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)](https://vitejs.dev/)

Uma aplicação moderna de catálogo de filmes e séries desenvolvida em React com TypeScript, oferecendo uma experiência cinematográfica completa e intuitiva.

![ReactFlix Demo](https://react-flix-indol.vercel.app/reactflix.png)

## ✨ Funcionalidades Principais

### 🎭 Conteúdo Abrangente
- **Catálogo Completo**: Listagem de filmes e séries com scroll infinito
- **Detalhes Detalhados**: Páginas dedicadas com informações completas sobre filmes, séries e elenco
- **Busca Inteligente**: Pesquisa avançada por palavras-chave
- **Perfis de Pessoas**: Páginas detalhadas sobre atores, diretores e equipe técnica

### 🎨 Experiência do Usuário
- **🌓 Tema Escuro/Claro**: Alternância suave entre modos de visualização
- **📱 Design Responsivo**: Experiência otimizada para todos os dispositivos
- **⚡ Performance**: Carregamento rápido e navegação fluida

## 🛠 Tecnologias Utilizadas

### Principais Dependências
| Pacote | Versão | Descrição |
|--------|---------|-----------|
| **React** | 19.1.1 | Biblioteca principal para interface |
| **TypeScript** | ~5.9.3 | Tipagem estática para JavaScript |
| **Vite** | 7.1.7 | Build tool e dev server ultrarrápido |
| **React Router** | 7.9.5 | Roteamento para aplicação SPA |
| **TanStack Query** | 5.90.6 | Gerenciamento de estado do servidor |
| **Zustand** | 5.0.8 | Gerenciamento de estado global |
| **Framer Motion** | 12.23.24 | Animações e transições |
| **Tailwind CSS** | 4.1.16 | Framework CSS utilitário |

### UI e UX
- **ShadCn**: Componentes acessíveis (Dialog, Dropdown, Select, Tooltip)
- **Lucide React**: Ícones modernos e consistentes
- **Embla Carousel**: Carrosséis suaves com autoplay
- **Tailwind Merge**: Combinação inteligente de classes CSS

### Ferramentas de Desenvolvimento
- **Biome**: Linting e formatação
- **Husky**: Git hooks
- **Commitizen**: Conventional commits
- **Axios**: Cliente HTTP

## 🚀 Começando

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/lucasssantos94/ReactFlix.git
cd reactflix
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa linting do código |
| `npm run format` | Formata o código automaticamente |
| `npm run commit` | Commit interativo com conventional commits |

## 🎯 Estrutura do Projeto

```
reactflix/

src/
├── app/
│   ├── api/              # Configuração da API TMDB
│   ├── contexts/         # Providers (Theme, Query)
│   ├── hooks/            # Custom hooks organizados por domínio
│   ├── services/         # Serviços de API organizados
│   ├── stores/           # Gerenciamento de estado (Zustand)
│   ├── types/            # Definições TypeScript
│   ├── utils/            # Funções utilitárias
│   └── router/           # Configuração de rotas
├── views/
│   ├── components/       # Componentes reutilizáveis
│   ├── layout/           # Layouts reutilizáveis das páginas
│   ├── pages/            # Páginas da aplicação
│   └── styles/           # Estilos globais
└── assets/               # Ícones e imagens estáticas
```

## 🎨 Funcionalidades em Destaque

### 🎬 Scroll Infinito
Navegação suave através de vastos catálogos sem necessidade de paginação tradicional.

### 🔍 Busca Avançada
- Pesquisa por títulos, pessoas

### 👥 Detalhes Completos
- Informações técnicas completas
- Elenco e equipe técnica
- Trailers
- Recomendações similares

### 🌓 Tema Dinâmico
- Alternância entre dark/light mode
- Preferências salvas localmente
- Transições suaves

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`npm run commit`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit
Utilizamos Conventional Commits para manter um histórico limpo e organizado.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎉 Agradecimentos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - Por fornecer a API de filmes e séries
- Comunidade React - Pelo ecossistema incrível

---

**ReactFlix** - Feito com ❤️ para amantes de cinema e séries!

