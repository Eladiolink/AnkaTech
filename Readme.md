# 🧠 Projeto de Gerenciamento de Ativos e Clientes

Este projeto é composto por um backend (API) e um frontend (interface web) para gerenciamento de clientes e seus ativos.

## 🚀 Tecnologias Utilizadas

- Backend:
  - Node.js
  - Docker / Docker Compose
  - MySQL (via Docker)
  - Fastify
  - Prisma ORM
  - Zod
- Frontend:
  - Next.js
  - React
  - TailwindCSS
  - ShadCN
  - React Query
  - React Hook Form + Zod
  - Axios
---

## ⚙️ Como Rodar o Projeto

### 🔧 Requisitos

- [Docker](https://www.docker.com/) instalado
- [Node.js](https://nodejs.org/) instalado (versão recomendada: 18 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/) ou [yarn] instalado (npm é usado neste exemplo)

---

## 🐳 Rodando o Backend (API)

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Suba o banco de dados e os serviços com Docker Compose:

```bash
docker compose up -d
```

3. O backend estará disponível (geralmente) em:

```
http://localhost:3333
```

Se necessário, ajuste as variáveis de ambiente no arquivo `.env` dentro da pasta `backend`.

---

## 🌐 Rodando o Frontend (Interface Web)

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

4. Acesse o frontend no navegador:

```
http://localhost:3000
```

---

## 🔗 Endpoints Backend (Exemplos)

- `/clients` – Gerenciamento de clientes
- `/assets` – Gerenciamento de ativos

---

## 📝 Observações

- Certifique-se de que o backend está rodando corretamente antes de iniciar o frontend, pois o frontend depende da API.
- Se for necessário, configure os arquivos `.env` no backend e frontend para apontar corretamente para os serviços.

---

## 💻 Estrutura de Pastas

```
/backend      -> API Node.js + Docker + Banco de Dados
/frontend     -> Frontend Next.js
```

---

## 🛠️ Comandos Úteis

- Subir o backend:
  ```bash
  cd backend && docker compose up -d
  ```
- Derrubar o backend:
  ```bash
  cd backend && docker compose down
  ```
- Rodar o frontend:
  ```bash
  cd frontend && npm run dev
  ```

---

## 🤝 Contribuição

Sinta-se livre para abrir issues, sugestões ou melhorias.

---

## 📜 Licença

Este projeto está licenciado sob os termos da licença MIT.