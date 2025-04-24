# Kanban Board - Gerenciador de Tarefas

Uma aplicação web moderna para gerenciamento de tarefas no estilo Kanban, desenvolvida com Angular. Este repositório contém o frontend da aplicação, que consome uma API RESTful desenvolvida em .NET Core disponível em um [projeto separado](https://github.com/Rudio1/CrudTaskAPI).
![image](https://github.com/user-attachments/assets/3ec14261-0594-4f7a-8c7b-7fadcc767fc6)

## 🚀 Funcionalidades

- **Quadro Kanban Interativo**
  - Arrastar e soltar tarefas entre colunas (A Fazer, Em Progresso, Concluído)
  - Visualização clara do progresso das tarefas
  - Indicadores visuais por status

- **Gerenciamento de Tarefas**
  - Criar novas tarefas com nome, descrição e categoria
  - Editar tarefas existentes
  - Mover tarefas entre diferentes estágios
  - Excluir tarefas

- **Categorização e Filtros**
  - Organizar tarefas por categorias
  - Filtrar tarefas por categoria
  - Indicadores visuais por prioridade (Alta, Média, Baixa)

## 🛠️ Tecnologias Utilizadas

### Frontend (Este Repositório)
- Angular 19
- Angular Material CDK (Drag and Drop)
- Bootstrap Icons
- TypeScript
- SCSS/CSS para estilização

### Backend (Repositório Separado)
> ⚠️ **Nota**: O backend está disponível em um [repositório separado](https://github.com/Rudio1/CrudTaskAPI)
- .NET Core
- Entity Framework Core
- SQL Server
- RESTful API

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Angular CLI (versão 19)
- Backend da aplicação rodando localmente (ver [CrudTaskAPI](https://github.com/Rudio1/CrudTaskAPI))

## 🔧 Instalação e Configuração

### Frontend (Este Repositório)

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/Rudio1/FrontEndTaskAPI.git
\`\`\`

2. Navegue até a pasta do projeto:
\`\`\`bash
cd FrontEndTaskAPI
\`\`\`

3. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

4. Inicie a aplicação:
\`\`\`bash
ng serve
\`\`\`

A aplicação estará disponível em `http://localhost:4200`

### Backend (Repositório Separado)

Para configurar e executar o backend da aplicação, siga as instruções no [repositório da API](https://github.com/Rudio1/CrudTaskAPI).

A API deve estar rodando em `http://localhost:5001` para que o frontend funcione corretamente.

## 🔗 Integração com o Backend

Este frontend foi desenvolvido para trabalhar em conjunto com a API RESTful do projeto [CrudTaskAPI](https://github.com/Rudio1/CrudTaskAPI). Certifique-se de que:

1. O backend está rodando antes de iniciar o frontend
2. A URL base da API está configurada corretamente no serviço (`http://localhost:5001/api`)
3. Todas as rotas da API estão acessíveis

## 🎨 Personalização

O sistema utiliza um esquema de cores intuitivo para diferentes estados:

- **A Fazer**: Borda azul (#2196F3)
- **Em Progresso**: Borda amarela (#FFC107)
- **Concluído**: Borda verde (#4CAF50)

As cores podem ser personalizadas através dos arquivos de estilo.


