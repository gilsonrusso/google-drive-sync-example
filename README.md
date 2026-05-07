# Google Drive Sync Example 🚀

Este projeto é uma aplicação full-stack para gerenciamento e sincronização de arquivos, utilizando uma arquitetura moderna baseada em URLs pré-assinadas para uploads e downloads diretos no storage.

## 🏗️ Estrutura do Projeto

O repositório está organizado como um monorepo simples:

-   [`/backend`](./backend): API construída com **Fastify**, **Prisma (PostgreSQL)** e integração com **MinIO**.
-   [`/frontend`](./frontend): Interface de usuário desenvolvida com **React**, **Vite**, **Material UI** e **TanStack Query**.

## 🛠️ Tecnologias Principais

-   **Linguagem**: TypeScript (em todo o stack)
-   **Storage**: MinIO (S3 Compatible)
-   **Banco de Dados**: PostgreSQL (via Prisma ORM)
-   **Estilo**: Material UI (MUI)
-   **Gerenciamento de Estado**: TanStack Query (React Query)
-   **Roteamento**: React Router

## 🚀 Como Iniciar

### Pré-requisitos

-   Node.js (v20 ou superior)
-   Docker e Docker Compose (para o MinIO e PostgreSQL)

### Passos para Rodar Localmente

1.  **Clone o repositório**:
    ```bash
    git clone <seu-repo-url>
    cd google-drive-sync-example
    ```

2.  **Configuração do Backend**:
    -   Acesse a pasta `backend`.
    -   Copie o `.env.example` para `.env` e ajuste as credenciais.
    -   Instale as dependências e inicie:
        ```bash
        npm install
        npm run dev
        ```

3.  **Configuração do Frontend**:
    -   Acesse a pasta `frontend`.
    -   Instale as dependências e inicie:
        ```bash
        npm install
        npm run dev
        ```

4.  **Acesse a aplicação**:
    -   Frontend: `http://localhost:5173`
    -   Backend: `http://localhost:3333`

## 📝 Licença

Este projeto está sob a licença ISC.
