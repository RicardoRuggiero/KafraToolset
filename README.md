============================================================================
# KafraToolset - Backend API

Aluno: Ricardo <br>
Disciplina: Fullstack  <br>
Professor: Luis <br>

Banco de Dados usado:
https://supabase.com

============================================================================

## ➡️ Descrição
API RESTful, CRUD;
Permite gerenciamento de itens, NPCs e suas relações de venda.

============================================================================

## ➡️ Tecnologias
- Node.js
- Express
- TypeORM
- PostgreSQL (Supabase)
- TypeScript
- JWT (Autenticação)
- Multer (Upload de imagens)
- Bcrypt (Hash de senha)

============================================================================

## ➡️ Funcionalidades
- CRUD de Items
- CRUD de NPCs
- Relacionamento: Item ↔ NPC = (SoldBy)
- Validação de dados (middleware)
- Persistência em banco de dados
- Autenticação com JWT
- Hash de senha com bcrypt
- Upload de imagens (items)
- Proteção de rotas com middleware
- Tratamento global de erros

============================================================================

## ➡️ Fluxo da Aplicação
JSON → TypeORM → Banco de Dados → API REST → CRUD

============================================================================

## ➡️ Como Executar

Instalar dependências:<br>
``npm install``<br>

Criar arquivo .env com:<br>
- DATABASE_URL<br>
- JWT_SECRET<br>

Rodar aplicação:<br>
``npm run dev``<br>

Servidor:<br>
``http://localhost:3000``<br>

============================================================================

## ➡️ Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Items
- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id

### NPCs
- GET /api/npcs
- GET /api/npcs/:id
- POST /api/npcs
- PUT /api/npcs/:id
- DELETE /api/npcs/:id

### SoldBy
- POST /api/soldby
- DELETE /api/soldby/:id

============================================================================

## ✅ Testes
As rotas podem ser testadas via:
- Thunder Client (VSCode)
- Postman

============================================================================
 
<img width="311" height="719" alt="image" src="https://github.com/user-attachments/assets/195b82f2-e19c-42c0-91fe-4c9617b4e4d9" />

<img width="879" height="547" alt="image" src="https://github.com/user-attachments/assets/81888407-2f2c-4552-923f-421429ead62d" />
 
============================================================================

## ✨ Status do Projeto
✔ CRUD completo  
✔ Validação implementada  
✔ Relacionamentos funcionando  
✔ Autenticação JWT  
✔ Upload de imagens  
✔ Tratamento de erros  

============================================================================
