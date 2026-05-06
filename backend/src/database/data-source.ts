// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Carrega .env → configura TypeORM → conecta no Postgres → registra entidades
// (Item, Npc, Soldby)
//
// File: data-source.ts
// Purpose: Ponte entre o ambiente Node.js e o banco de dados Postgres/Supabase.
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
  throw new Error("DATABASE_URL não definida")
}
// CONTROLE INTELIGENTE DO SYNCHRONIZE
// Use no .env: DB_SYNC=true || DB_SYNC=false
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