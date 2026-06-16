### Arquivo: src/controllers/auth.controller.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Receber requisiÃ§Ãµes HTTP de autenticaÃ§Ã£o e delegar ao service
//
// File: auth.controller.ts
// Purpose: Endpoint para login de usuÃ¡rios
// ============================================================================

import { Request, Response, NextFunction } from "express";
import * as loginService from "../services/login.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha } = req.body;
    const result = await loginService.login(email, senha);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha, secret } = req.body;

    if (secret !== process.env.REGISTER_SECRET) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const user = await loginService.register(email, senha);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
```


### Arquivo: src/controllers/item.controller.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Recebe requisiÃ§Ãµes HTTP e delega as aÃ§Ãµes ao service
//
// File: item.controller.ts
// Purpose: Endpoints CRUD de items
// ============================================================================

import { Request, Response, NextFunction } from "express"
import * as itemService from "../services/item.service"

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await itemService.getAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const item = await itemService.getById(id)
    if (!item) throw { status: 404, message: "Item nÃ£o encontrado" }
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    //seforArquivo
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    // NUMBER<p/Ã±viraStringCausado>form-data(multer) 
    if (data.weight !== undefined) {
      data.weight = Number(data.weight);
    }

    const item = await itemService.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const item = await itemService.update(id, req.body)
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    await itemService.remove(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
```


### Arquivo: src/controllers/npc.controller.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Recebe requisiÃ§Ãµes HTTP e delega as aÃ§Ãµes ao service
//
// File: npc.controller.ts
// Purpose: Endpoints CRUD de NPC
// ============================================================================

import { Request, Response, NextFunction } from "express"
import * as npcService from "../services/npc.service"

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await npcService.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const data = await npcService.getById(id)
    if (!data) throw { status: 404, message: "NPC nÃ£o encontrado" }
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await npcService.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const data = await npcService.update(id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    await npcService.remove(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
```


### Arquivo: src/controllers/soldby.controller.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Recebe requisiÃ§Ãµes HTTP e delega as aÃ§Ãµes ao service
//
// File: soldby.controller.ts
// Purpose: Endpoints para gerenciar relaÃ§Ã£o Item & NPC
// ============================================================================

import { Request, Response, NextFunction } from "express"
import * as soldbyService from "../services/soldby.service"

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await soldbyService.create(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}
```


### Arquivo: src/database/data-source.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Carrega .env, Configura TypeORM, 
// Conecta no Postgres, Registra entidades
//
// File: data-source.ts
// Purpose: Ponte-> Node.js || DB Postgres/Supabase
// ============================================================================

import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
import { Item } from "../entities/item"
import { Soldby } from "../entities/soldby"
import { Npc } from "../entities/npc"
import { Usuario } from "../entities/usuario"

dotenv.config()
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL nÃ£o definida")
}

const isSyncEnabled = process.env.DB_SYNC === "true"

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: isSyncEnabled, // controlado por ENV
  logging: true,
  entities: [Item, Npc, Soldby, Usuario],
  ssl: {
    rejectUnauthorized: false
  }
})
```


### Arquivo: src/entities/item.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a estrutura da tabela ITEM utilizando decoradores do TypeORM
//
// File: item.ts
// Purpose: Gerenciar dados e informaÃ§Ãµes bÃ¡sicos
// ============================================================================

import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Soldby } from "./soldby";

@Entity("item")
export class Item {
  @PrimaryColumn({ type: "int" })
  id!: number
  @Column({ type: "varchar", length: 255 })
  name!: string
  @Column({ type: "text", nullable: true })
  description!: string | null
  @Column({ type: "float", nullable: true })
  weight!: number | null
  @Column({ type: "text", nullable: true })
  imageUrl?: string;
  @OneToMany(() => Soldby, (soldby) => soldby.item)
  npcSales!: Soldby[];
}
```


### Arquivo: src/entities/npc.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a estrutura da tabela NPC utilizando decoradores do TypeORM
//
// File: npc.ts
// Purpose: Gerenciar dados estruturados de NPCs e suas relaÃ§Ãµes com itens
// ============================================================================

import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Soldby } from "./soldby";

@Entity("npc")
export class Npc {
    @PrimaryColumn()
    id!: number;
    @Column({ type: "varchar", length: 255, nullable: true })
    name!: string | null;
    @Column({ type: "varchar", length: 255 })
    mapname!: string;
    @Column({ type: "int" })
    x!: number;
    @Column({ type: "int" })
    y!: number;
    @Column({ type: "int" })
    job!: number;
    @Column({ type: "varchar", length: 50 })
    type!: string;
    @OneToMany(() => Soldby, (Soldby) => Soldby.npc)
    itemSales!: Soldby[];
}
```


### Arquivo: src/entities/soldby.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a entidade intermediÃ¡ria Soldby
// ResponsÃ¡vel por representar a relaÃ§Ã£o entre item e npc,
// incluindo informaÃ§Ãµes adicionais como o PREÃ‡O(price)
// Implementa relacionamento Many-to-One com Item e NPC,
// caracterizando uma relaÃ§Ã£o Many-to-Many com atributos
//
// File: soldby.ts
// Purpose: Gerenciar a associaÃ§Ã£o entre itens e NPCs com dados de venda
// ============================================================================

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item";
import { Npc } from "./npc";

@Entity("soldby")
export class Soldby {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: "int" })
    price!: number;
    @ManyToOne(() => Item, (item) => item.npcSales)
    item!: Item;
    @ManyToOne(() => Npc, (npc) => npc.itemSales)
    npc!: Npc;   
}
```


### Arquivo: src/entities/usuario.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a estrutura da tabela usuario
// Mapeia propriedades e dados de disponibilidade (JSON)
// utilizando decoradores do TypeORM.
//
// File: usuario.ts
// Purpose: Gerenciar dados e informaÃ§Ãµes bÃ¡sicos
// ============================================================================

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column()
  senha!: string
}
```


### Arquivo: src/middlewares/auth.middleware.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// AutenticaÃ§Ã£o JWT
//
// File: auth.middleware.ts
// Purpose: Validar o JWT nas rotas protegidas
// ============================================================================

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET nÃ£o estÃ¡ definido");
}

const SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token nÃ£o fornecido" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invÃ¡lido ou expirado" });
  }
}
```


### Arquivo: src/middlewares/error.middleware.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// GLOBAL e multer(upload imagens)
// 400 = (Bad Request)
// 500 =(Internal Server Error)
//
// File: error.middleware.ts
// Purpose: Validar dados
// ============================================================================

import { Request, Response, NextFunction } from "express"
import multer from "multer";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  // TRATA ERRO UPLOAD DE ARQUIVOS 
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: "Erro no upload: " + err.message
    })
  }
  if (err.message?.includes("Formato invÃ¡lido")) {
    return res.status(400).json({
      error: err.message
    })
  }

  const status = err.status || 500
  const message = err.message || "Erro interno do servidor"

  res.status(status).json({
    error: message
  })
}
```


### Arquivo: src/middlewares/logger.middleware.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Registrar todas as requisiÃ§Ãµes HTTP recebidas pela API
// Exibir mÃ©todo (GET, POST, PUT, DELETE) e URL acessada
// Auxiliar no debug e monitoramento da aplicaÃ§Ã£o
//
// File: logger.middleware.ts
// Purpose: Logar requisiÃ§Ãµes HTTP no console durante execuÃ§Ã£o do servidor
// ============================================================================

import { Request, Response, NextFunction } from "express"

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`)
  next()
}
```


### Arquivo: src/middlewares/upload.middleware.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Upload de Arquivos (Multer)
// Asrmazenar imagens no servidor
// Gerar nome Ãºnico para arquivos
// Validar tipo de arquivo (imagem)
//
// File: upload.middleware.ts
// Purpose: Gerenciar upload de imagens via multipart/form-data
// ============================================================================

import multer from "multer";
import path from "path";

// configuraÃ§Ã£o de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; //seguranÃ§a-integridade
    cb(null, filename);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato invÃ¡lido (png, jpg, jpeg, webp)"));
    }

    cb(null, true);
  }
});
```


### Arquivo: src/middlewares/validation.middleware.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// ValidaÃ§Ã£o diretamente nas rotas
//
// File: validation.middleware.ts
// Purpose: Validar dados
// ============================================================================

import { Request, Response, NextFunction } from "express"

// ==========================
// ITEM VALIDATION
// ==========================
export function validateItem(req: Request, res: Response, next: NextFunction) {
  const { id, name, weight } = req.body

  // ID (opcional, mas se vier precisa ser nÃºmero)
  if (id !== undefined && typeof id !== "number") {
    return res.status(400).json({ error: "ID deve ser nÃºmero" })
  }

  // NAME (obrigatÃ³rio e nÃ£o pode ser vazio)
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Nome Ã© obrigatÃ³rio e nÃ£o pode ser vazio" })
  }

  // WEIGHT (opcional, mas se vier precisa ser nÃºmero)
  if (weight !== undefined && typeof weight !== "number") {
    return res.status(400).json({ error: "Weight deve ser nÃºmero" })
  }

  next()
}

// ==========================
// NPC VALIDATION
// ==========================
export function validateNpc(req: Request, res: Response, next: NextFunction) {
  const { id, mapname, x, y } = req.body

  // ID obrigatÃ³rio e vÃ¡lido
  if (id === undefined || typeof id !== "number") {
    return res.status(400).json({ error: "ID do NPC Ã© obrigatÃ³rio e deve ser nÃºmero" })
  }

  // MAPNAME obrigatÃ³rio e nÃ£o vazio
  if (!mapname || typeof mapname !== "string" || mapname.trim() === "") {
    return res.status(400).json({ error: "Mapname Ã© obrigatÃ³rio" })
  }

  // COORDENADAS obrigatÃ³rias
  if (typeof x !== "number" || typeof y !== "number") {
    return res.status(400).json({ error: "Coordenadas invÃ¡lidas" })
  }

  next()
}
```


### Arquivo: src/routes/auth.routes.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define os endpoints e conecta com o controller
//
// File: auth.routes.ts
// Purpose: Mapear rotas REST para operaÃ§Ãµes de login e geraÃ§Ã£o de token
// ============================================================================

import { Router } from "express";
import * as controller from "../controllers/auth.controller";

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
```


### Arquivo: src/routes/item.routes.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define os endpoints e conecta com o controller
//
// File: item.routes.ts
// Purpose: Mapear rotas REST para operaÃ§Ãµes de items
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/item.controller"
// import { validateItem } from "../middlewares/validation.middleware" // PODE DAR CONFLITO DE BIBLIOTECA
import { authMiddleware } from "../middlewares/auth.middleware" // CHECK
import { upload } from "../middlewares/upload.middleware"; // BINÃRIO

const router = Router()
// LIVRE
router.get("/", controller.getAll)
router.get("/:id", controller.getById)
// CONTROLE
router.post("/", authMiddleware, upload.single("image"), controller.create)
router.put("/:id", authMiddleware, controller.update)
router.delete("/:id", authMiddleware, controller.remove)

export default router
```


### Arquivo: src/routes/npc.routes.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define os endpoints e conecta com o controller
//
// File: npc.routes.ts
// Purpose: Mapear endpoints de NPC
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/npc.controller"
import { validateNpc } from "../middlewares/validation.middleware"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
// LIVRE
router.get("/", controller.getAll)
router.get("/:id", controller.getById)
// CONTROLE
router.post("/", authMiddleware, validateNpc, controller.create)
router.put("/:id", authMiddleware, validateNpc, controller.update)
router.delete("/:id", authMiddleware, controller.remove)

export default router
```


### Arquivo: src/routes/soldby.routes.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define os endpoints e conecta com o controller
//
// File: soldby.routes.ts
// Purpose: Mapear rotas REST para operaÃ§Ãµes de relaÃ§Ã£o Item â†” NPC
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/soldby.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
// CONTROLE
router.post("/", authMiddleware, controller.create)

export default router
```


### Arquivo: src/services/item.service.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// lÃ³gica de negÃ³cio e Acesso ao DB via TypeORM
//
// File: item.service.ts
// Purpose: Executar operaÃ§Ãµes CRUD na entidade Item
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Item } from "../entities/item"

const repo = AppDataSource.getRepository(Item)

export async function getAll() {
  return repo.find()
}

export async function getById(id: number) {
  return repo.findOneBy({ id })
}

export async function create(data: Partial<Item>) {
  const item = repo.create(data)
  return repo.save(item)
}

export async function update(id: number, data: Partial<Item>) {
  const item = await repo.findOneBy({ id })
  if (!item) {
    throw { status: 404, message: "Item nÃ£o encontrado" }
  }

  repo.merge(item, data)
  return repo.save(item)
}

export async function remove(id: number) {
  const result = await repo.delete(id)

  if (result.affected === 0) {
    throw { status: 404, message: "Item nÃ£o encontrado" }
  }

  return true
}
```


### Arquivo: src/services/login.service.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// CriaÃ§Ã£o e Acesso ao banco
//
// File: login.service.ts
// Purpose: ServiÃ§o de autenticaÃ§Ã£o de usuÃ¡rios.
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Usuario } from "../entities/usuario"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET nÃ£o estÃ¡ definido");
}

const SECRET = process.env.JWT_SECRET;
const repo = AppDataSource.getRepository(Usuario)

// CADASTRO
export async function register(email: string, senha: string) {

  const existing = await repo.findOneBy({ email })
  if (existing) {
    throw { status: 400, message: "Email jÃ¡ cadastrado" }
  }

  const hash = await bcrypt.hash(senha, 10)

  const user = repo.create({
    email,
    senha: hash
  })

  return repo.save(user)
}

// ACESSO 
export async function login(email: string, senha: string) {

  const user = await repo.findOneBy({ email })

  if (!user) {
    throw { status: 401, message: "Credenciais invÃ¡lidas" }
  }

  const senhaValida = await bcrypt.compare(senha, user.senha)

  if (!senhaValida) {
    throw { status: 401, message: "Credenciais invÃ¡lidas" }
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  )

  return { token }
}
```


### Arquivo: src/services/npc.service.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// FunÃ§Ãµes Exportadas da Service para a Controller
//
// File: npc.service.ts
// Purpose: Executar operaÃ§Ãµes CRUD na entidade NPC
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Npc } from "../entities/npc"

const repo = AppDataSource.getRepository(Npc)

export async function getAll() {
  return repo.find()
}

export async function getById(id: number) {
  return repo.findOneBy({ id })
}

export async function create(data: Partial<Npc>) {
  const npc = repo.create(data)
  return repo.save(npc)
}

export async function update(id: number, data: Partial<Npc>) {
  const npc = await repo.findOneBy({ id })
  if (!npc) {
    throw { status: 404, message: "NPC nÃ£o encontrado" }
  }

  repo.merge(npc, data)
  return repo.save(npc)
}

export async function remove(id: number) {
  const result = await repo.delete(id)

  if (result.affected === 0) {
    throw { status: 404, message: "NPC nÃ£o encontrado" }
  }

  return true
}
```


### Arquivo: src/services/soldby.service.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// LÃ³gica de negÃ³cio da relaÃ§Ã£o entre item & npc
//
// File: soldby.service.ts
// Purpose: Gerenciar vendas de item por npc com regras de negÃ³cio
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Soldby } from "../entities/soldby"
import { Item } from "../entities/item"
import { Npc } from "../entities/npc"

const repo = AppDataSource.getRepository(Soldby)
const itemRepo = AppDataSource.getRepository(Item)
const npcRepo = AppDataSource.getRepository(Npc)

export async function create(data: { itemId: number, npcId: number, price: number }) {

  // REGRA 1: preÃ§o vÃ¡lido
  if (data.price <= 0) {
    throw { status: 400, message: "PreÃ§o deve ser maior que zero" }
  }

  // buscar entidades
  const item = await itemRepo.findOneBy({ id: data.itemId })
  const npc = await npcRepo.findOneBy({ id: data.npcId })

  if (!item) throw { status: 404, message: "Item nÃ£o encontrado" }
  if (!npc) throw { status: 404, message: "NPC nÃ£o encontrado" }

  // REGRA 2: nÃ£o duplicar venda
  const existing = await repo.findOne({
    where: {
      item: { id: data.itemId },
      npc: { id: data.npcId }
    },
    relations: ["item", "npc"]
  })

  if (existing) {
    throw { status: 400, message: "NPC jÃ¡ vende este item" }
  }

  // cria 
  const sold = repo.create({
    price: data.price,
    item,
    npc
  })

  return repo.save(sold)
}
```


### Arquivo: src/createTables.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Script responsÃ¡vel por inicializar a conexÃ£o com o banco de dados
// e executar a sincronizaÃ§Ã£o das entidades via TypeORM.
//
// Ao iniciar o AppDataSource, o TypeORM cria ou atualiza automaticamente
// as tabelas com base nas entidades registradas, dependendo da flag
// `synchronize` definida no data-source
//
// File: createTables.ts
// Purpose: Criar e sincronizar a estrutura das tabelas no banco de dados
// ============================================================================

import { AppDataSource } from "./database/data-source";

async function createTables() {
    try {
        console.log("Conectando ao banco de dados.");
        await AppDataSource.initialize();
        console.log("ConexÃ£o estabelecida.");
        console.log("SincronizaÃ§Ã£o de tabelas executada (verifique DB_SYNC).");
        await AppDataSource.destroy();
        console.log("ConexÃ£o encerrada.");
    } catch (error) {
        console.error("Erro durante a sincronizaÃ§Ã£o:", error);
    }
}

createTables();
```


### Arquivo: src/server.ts
```typescript
// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// InicializaÃ§Ã£o do servidor Express e conexÃ£o com banco
// Configura middlewares, rotas e start da aplicaÃ§Ã£o
//
// File: server.ts
// Purpose: Entry point da API REST
// ============================================================================

import express from "express"
import cors from "cors"
import { AppDataSource } from "./database/data-source"
import authRoutes from "./routes/auth.routes"
import itemRoutes from "./routes/item.routes"
import npcRoutes from "./routes/npc.routes"
import soldbyRoutes from "./routes/soldby.routes"
// ROTAS GLOBAL
import { errorHandler } from "./middlewares/error.middleware"
import { logger } from "./middlewares/logger.middleware"

const app = express()

app.use(cors())
app.use(express.json())

// USO GLOBAL
app.use(logger)
//ROTA DE IMAGENS
app.use("/uploads", express.static("uploads"));
// LOGIN USUARIO
app.use("/api/auth", authRoutes)
// PREFIXOS DA API
app.use("/api/items", itemRoutes)
app.use("/api/npcs", npcRoutes)
app.use("/api/soldby", soldbyRoutes)
// Confirmar rotas do render
app.get("/kafratoolset", (req, res) => {
  res.json({ message: "KafraToolset" })
})
app.get("/", (req, res) => {
  res.json({ message: "API KafraToolset online" })
})
// TRATAMENTO DE ERRO
app.use(errorHandler)

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    console.log("Database conectado com sucesso")
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Erro na conexÃ£o do Database", error)
  })
```

### Arquivo: package.json
```json
{
  "name": "kafratoolset-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn src/server.ts",
    "sync": "ts-node src/createTables.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Ricardo RO - EOS",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.1.1",
    "pg": "^8.20.0",
    "reflect-metadata": "^0.2.2",
    "typeorm": "^0.3.28"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/multer": "^2.1.0",
    "@types/node": "^25.5.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.9.3"
  }
}
```


### Arquivo: tsconfig.json
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "node16",
    "moduleResolution": "node16",
    "target": "es2020",
    "types": ["node"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "strict": true,
    "jsx": "react-jsx",
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
  }
}
```
