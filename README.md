# 🖥️ FrontEndTaskAPI

Front-end desenvolvido em ReactJS para consumir a API de gerenciamento de tarefas fornecida pelo projeto CrudTaskAPI.

---

## 📌 Tecnologias Utilizadas

- ReactJS
- Axios
- Vite
- Tailwind CSS

---

## 📖 Funcionalidades

- Exibir lista de tarefas
- Adicionar nova tarefa
- Editar tarefa existente
- Deletar tarefa

---

## 📦 Como Executar o Front-end

### 📑 Pré-requisitos:
- Node.js 18+
- NPM ou Yarn

### 📥 Clone o projeto

git clone https://github.com/Rudio1/FrontEndTaskAPI.git
cd FrontEndTaskAPI

### 📦 Instale as dependências

npm install

### ⚙️ Configure a URL da API em `src/api/api.js`

const api = axios.create({
  baseURL: 'https://localhost:5001/api'
});

### ▶️ Rode a aplicação

npm run dev

Acesse em:
http://localhost:5173/

---

## 🔗 Integração com o Back-end

Este front-end consome a API RESTful hospedada no projeto:
👉 https://github.com/Rudio1/CrudTaskAPI
