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
  throw new Error("DATABASE_URL não definida")
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