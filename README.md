# KafraToolset - DB RO

Aplicação fullstack desenvolvida para gerenciamento de dados inspirados no universo de RO, com foco em itens, NPCs e suas relações de venda.

O projeto é composto por uma API RESTful em Node.js/Express integrada a um banco PostgreSQL/Supabase e por uma Single Page Application em React/Vite responsável pelo consumo da API, autenticação de usuários, navegação entre telas, cadastros, listagens, edição, exclusão e vínculo entre entidades.

---

## ➡️ Descrição

O **KafraToolset** é uma aplicação fullstack com arquitetura cliente-servidor, desenvolvida para organizar e manipular dados de itens, NPCs e relações comerciais entre eles.

A regra central do domínio é:

> Um NPC pode vender vários itens.
> Um item pode ser vendido por vários NPCs.
> A relação entre Item e NPC possui um dado próprio: o preço.

Modelo conceitual:

```text
Item 1 --- N Soldby N --- 1 NPC

Soldby = relação de venda
Soldby.price = preço do item vendido por determinado NPC
```

O backend fornece uma API RESTful com endpoints organizados por recurso, uso adequado de verbos HTTP, respostas em JSON, status codes, autenticação JWT, hash de senha, upload de imagens e tratamento global de erros.

O frontend consome essa API por meio de serviços Axios, possui rotas com React Router, autenticação centralizada via Context API, proteção de telas privadas, formulários com validação, tabelas de listagem, layout responsivo e interface visual customizada no estilo Frutiger Aero.

---

## ➡️ Tecnologias

### Backend

* Node.js
* Express
* TypeScript
* TypeORM
* PostgreSQL
* Supabase
* JWT para autenticação
* Bcrypt para hash de senha
* Multer para upload de imagens
* CORS
* Dotenv
* Render para deploy da API

### Frontend

* React
* Vite
* TypeScript
* React Router DOM
* Axios
* Bootstrap
* React Bootstrap
* CSS customizado
* Context API
* LocalStorage para persistência do token JWT

---

## ➡️ Funcionalidades

### Backend

* API RESTful organizada por recursos
* CRUD de Items
* CRUD de NPCs
* Criação de relação Item ↔ NPC por meio da entidade Soldby
* Cadastro e login de usuários
* Autenticação com JWT
* Hash de senha com bcrypt
* Proteção de rotas privadas com middleware de autenticação
* Upload de imagens para itens com Multer
* Servir arquivos estáticos da pasta `/uploads`
* Validação de dados em rotas específicas
* Tratamento global de erros
* Logger de requisições HTTP
* Conexão com PostgreSQL/Supabase via TypeORM
* Sincronização controlada do banco via variável `DB_SYNC`
* Endpoint de teste para deploy

### Frontend

* SPA desenvolvida em React
* Navegação com React Router
* Página inicial com menu de acesso às principais funcionalidades
* Cadastro de usuário
* Login de usuário
* Persistência do token JWT no LocalStorage
* Contexto global de autenticação com AuthContext
* Menu de usuário autenticado
* Logout
* Rotas protegidas para telas privadas
* Listagem de itens
* Cadastro de itens
* Edição de itens
* Exclusão de itens
* Upload de imagem de item via formulário multipart/form-data
* Listagem de NPCs
* Cadastro de NPCs
* Edição de NPCs
* Exclusão de NPCs
* Criação de vínculo Item vendido por NPC
* Validações visuais em campos de formulário
* Botão de voltar
* Botão de voltar ao topo
* Tabelas estilizadas
* Interface responsiva para mobile
* Tema visual customizado com CSS próprio

---

## ➡️ Arquitetura Geral

```text
Frontend React/Vite
        ↓
Services Axios
        ↓
API REST Express
        ↓
Controllers
        ↓
Services
        ↓
TypeORM Repositories
        ↓
PostgreSQL/Supabase
```

A aplicação separa responsabilidades em camadas:

```text
Routes       → definem os endpoints da API
Controllers  → recebem as requisições HTTP
Services     → executam regras de negócio
Entities     → representam as tabelas do banco
Middlewares  → autenticação, validação, upload, log e erros
Database     → conexão e configuração do TypeORM
```

No frontend, a estrutura é organizada por:

```text
components   → componentes reutilizáveis
contexts     → estado global de autenticação
pages        → telas da aplicação
services     → comunicação com a API
style        → arquivos CSS
types        → interfaces TypeScript
```

---

## ➡️ Modelo de Dados

### Item

Representa um item cadastrado no sistema.

Principais campos:

* `id`
* `name`
* `description`
* `weight`
* `imageUrl`

Relacionamento:

```text
Item 1 --- N Soldby
```

---

### NPC

Representa um NPC cadastrado no sistema.

Principais campos:

* `id`
* `name`
* `mapname`
* `x`
* `y`
* `job`
* `type`

Relacionamento:

```text
NPC 1 --- N Soldby
```

---

### Soldby

Representa a relação de venda entre um Item e um NPC.

Principais campos:

* `id`
* `price`
* `item`
* `npc`

Essa entidade funciona como uma tabela intermediária com atributo próprio.

```text
Item N --- N NPC
        via Soldby
```

---

### Usuario

Representa um usuário autorizado a acessar funcionalidades protegidas.

Principais campos:

* `id`
* `email`
* `senha`

A senha é armazenada com hash usando bcrypt.

---

## ➡️ Autenticação e Segurança

A autenticação é baseada em JWT.

Fluxo:

```text
Usuário faz login
        ↓
Backend valida email e senha
        ↓
Backend gera token JWT assinado
        ↓
Frontend armazena token no LocalStorage
        ↓
Axios envia Authorization: Bearer token
        ↓
Middleware valida token nas rotas protegidas
```

O JWT funciona como a identidade temporária do usuário dentro da aplicação.

Depois do login, o cliente recebe um token assinado digitalmente. Esse token é enviado nas requisições privadas e validado no backend antes da execução da operação.

Rotas públicas:

* Login
* Cadastro
* Listagem de itens
* Busca de item por ID
* Listagem de NPCs
* Busca de NPC por ID

Rotas protegidas:

* Criar item
* Editar item
* Excluir item
* Criar NPC
* Editar NPC
* Excluir NPC
* Criar relação Item ↔ NPC

---

## ➡️ Upload de Imagens

O backend utiliza Multer para upload de imagens de itens.

Características:

* Upload via `multipart/form-data`
* Campo utilizado: `image`
* Armazenamento local na pasta `/uploads`
* Geração de nome único para o arquivo
* Limite de tamanho configurado
* Validação de formatos permitidos

Formatos aceitos:

* PNG
* JPG
* JPEG
* WEBP

As imagens ficam disponíveis publicamente pela rota:

```text
/uploads/nome-do-arquivo
```

---

## ➡️ Fluxo da Aplicação

### Fluxo de login

```text
LoginPage
   ↓
authService.login()
   ↓
POST /api/auth/login
   ↓
Backend valida credenciais
   ↓
Retorna JWT
   ↓
AuthContext salva token
   ↓
Usuário acessa rotas protegidas
```

---

### Fluxo de cadastro de item

```text
ItemCreatePage
   ↓
FormData com dados e imagem
   ↓
itemService.create()
   ↓
POST /api/items
   ↓
authMiddleware valida JWT
   ↓
uploadMiddleware processa imagem
   ↓
itemController
   ↓
itemService
   ↓
PostgreSQL/Supabase
```

---

### Fluxo de vínculo Item ↔ NPC

```text
SoldbyCreatePage
   ↓
Usuário seleciona Item, NPC e preço
   ↓
soldbyService.create()
   ↓
POST /api/soldby
   ↓
Backend valida preço
   ↓
Backend verifica se Item existe
   ↓
Backend verifica se NPC existe
   ↓
Backend impede vínculo duplicado
   ↓
Cria relação Soldby
```

---

## ➡️ Regras de Negócio

* Um item pode ser vendido por vários NPCs.
* Um NPC pode vender vários itens.
* A entidade Soldby representa a relação entre Item e NPC.
* A relação Soldby possui o campo `price`.
* O preço deve ser maior que zero.
* Não deve existir relação duplicada entre o mesmo Item e o mesmo NPC.
* Para criar uma relação Soldby, o Item e o NPC precisam existir.
* Rotas de escrita exigem autenticação via JWT.
* Usuários são autenticados por email e senha.
* Senhas são armazenadas com hash.
* Cadastro de usuário exige um `REGISTER_SECRET`.

---

## ➡️ Endpoints

URL base local:

```text
http://localhost:3000
```

URL base da API:

```text
http://localhost:3000/api
```

---

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

#### Register

Cria um novo usuário.

```http
POST /api/auth/register
```

Body:

```json
{
  "email": "admin@email.com",
  "senha": "123456",
  "secret": "chave-de-registro"
}
```

---

#### Login

Autentica um usuário e retorna um token JWT.

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "admin@email.com",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "jwt-token"
}
```

---

### Items

```http
GET    /api/items
GET    /api/items/:id
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
```

Rotas de leitura são públicas.
Rotas de criação, edição e exclusão exigem JWT.

---

### NPCs

```http
GET    /api/npcs
GET    /api/npcs/:id
POST   /api/npcs
PUT    /api/npcs/:id
DELETE /api/npcs/:id
```

Rotas de leitura são públicas.
Rotas de criação, edição e exclusão exigem JWT.

---

### Soldby

```http
POST /api/soldby
```

Cria uma relação entre Item e NPC.

Body:

```json
{
  "itemId": 501,
  "npcId": 1001,
  "price": 1200
}
```

Observação: o frontend também está preparado para consultar e remover vínculos por Item ou NPC durante o fluxo de exclusão, usando serviços específicos para dependências de Soldby.

---

## ➡️ Frontend - Rotas

```text
/                 → Home
/register         → Cadastro de usuário
/login            → Login
/items            → Lista de itens
/items/new        → Cadastro de item
/items/edit/:id   → Edição de item
/npcs             → Lista de NPCs
/npcs/new         → Cadastro de NPC
/npcs/edit/:id    → Edição de NPC
/soldby/new       → Cadastro de relação Item vendido por NPC
```

Rotas protegidas:

```text
/items/new
/items/edit/:id
/npcs/new
/npcs/edit/:id
/soldby/new
```

---

## ➡️ Interface

O frontend possui interface customizada com:

* Layout em cards
* Tema visual Frutiger Aero
* Fundo em degradê
* Botões estilizados
* Inputs com efeito visual
* Validação visual de campos
* Tabelas customizadas
* Miniaturas de itens
* Responsividade para telas menores
* Botão flutuante de voltar
* Botão flutuante de voltar ao topo
* Menu de usuário autenticado

---

## ➡️ Como Executar

### Pré-requisitos

* Node.js instalado
* npm instalado
* Banco PostgreSQL/Supabase configurado
* Variáveis de ambiente configuradas

---

## Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```env
DATABASE_URL=sua_url_do_postgresql
JWT_SECRET=sua_chave_jwt
REGISTER_SECRET=sua_chave_de_registro
DB_SYNC=false
PORT=3000
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

Build do backend:

```bash
npm run build
```

Executar build:

```bash
npm start
```

Sincronizar tabelas, caso necessário:

```bash
npm run sync
```

Servidor local:

```text
http://localhost:3000
```

Endpoint de teste:

```http
GET /kafratoolset
```

---

## Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

Build do frontend:

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

---

## ➡️ Variáveis de Ambiente

### Backend

```env
DATABASE_URL=
JWT_SECRET=
REGISTER_SECRET=
DB_SYNC=
PORT=
```

Descrição:

* `DATABASE_URL`: URL de conexão com o banco PostgreSQL/Supabase.
* `JWT_SECRET`: chave usada para assinar e validar tokens JWT.
* `REGISTER_SECRET`: chave exigida para permitir cadastro de usuários.
* `DB_SYNC`: controla a sincronização automática das entidades do TypeORM.
* `PORT`: porta de execução do servidor.

---

## ➡️ Testes

As rotas da API podem ser testadas com:

* Thunder Client
* Postman
* Insomnia

Sugestões de testes:

* Login com credenciais válidas
* Login com credenciais inválidas
* Cadastro com secret incorreto
* GET de itens
* GET de NPCs
* POST protegido sem token
* POST protegido com token válido
* Upload de imagem de item
* Criação de relação Soldby
* Tentativa de relação Soldby duplicada
* Busca de item inexistente
* Busca de NPC inexistente

---

## ➡️ Deploy

A API foi implantada na plataforma Render.

URL da API:

```text
https://kafratoolset.onrender.com
```

Endpoint de teste:

```http
GET /kafratoolset
```

Observações:

* O serviço pode entrar em modo de inatividade no plano gratuito.
* A primeira requisição após um período sem uso pode demorar alguns segundos.
* As variáveis de ambiente são configuradas diretamente no painel do Render.
* O backend está localizado na pasta `/backend` do repositório.

Configuração de build no Render:

```bash
npm install && npm run build
```

Configuração de start no Render:

```bash
npm start
```

---

## ➡️ Estrutura do Projeto

```text
KafraToolset/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── entities/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── createTables.ts
│   │   └── server.ts
│   │
│   ├── uploads/
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   │   ├── home/
    │   │   ├── item/
    │   │   ├── npc/
    │   │   └── user/
    │   ├── services/
    │   ├── style/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## ➡️ Status do Projeto

Projeto em desenvolvimento acadêmico, com backend funcional, frontend integrado e funcionalidades principais implementadas.

Principais entregas já contempladas:

* API RESTful
* CRUD de Items
* CRUD de NPCs
* Relação Item ↔ NPC
* Login com token
* Rotas protegidas
* Upload de imagem
* Interface React integrada à API
* Responsividade
* Deploy da API

---

## ➡️ Autor

Desenvolvido por **Ricardo RO - EOS**.

Projeto acadêmico Fullstack com foco em API REST, persistência de dados, autenticação, integração frontend/backend e interface web funcional.
