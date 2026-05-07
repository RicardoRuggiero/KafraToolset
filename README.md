
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
- Render (Web Service)

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
  

<img width="311" height="719" alt="image" src="https://github.com/user-attachments/assets/195b82f2-e19c-42c0-91fe-4c9617b4e4d9" />

<img width="879" height="547" alt="image" src="https://github.com/user-attachments/assets/81888407-2f2c-4552-923f-421429ead62d" />
 
============================================================================

## 🌐 Deploy

A aplicação foi implantada na plataforma Render.<br>
<br>
<img width="1873" height="905" alt="image" src="https://github.com/user-attachments/assets/72cd9e8d-9db1-4c18-b3f8-52536f3de902" />
<br>
<img width="349" height="205" alt="image" src="https://github.com/user-attachments/assets/8733f41a-cab4-4b7f-b32a-296b86fd51b7" />
<br><br>
URL da API:
<br>
https://kafratoolset.onrender.com

Observações:
- O serviço pode entrar em modo de inatividade (plano free), podendo demorar alguns segundos para responder.
- As variáveis de ambiente (DATABASE_URL, JWT_SECRET) foram configuradas no ambiente do Render.
- O backend está localizado na pasta /backend do repositório.

Para Build e Execução:
- Build: npm install && npm run build
- Start: npm start
- Endpoint de teste: <br>
  GET /kafratoolset <br>
  
============================================================================

(๑•̀ㅂ•́)و✧ (∩^o^)⊃━☆ ˎˊ˗ˎˊ˗ˎˊ˗ˎˊ˗ˎˊ
⋆𖦹˚｡⋆°˚🦕𓂃ִֶָ🪽་༘࿐..
