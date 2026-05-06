// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Inicialização do servidor Express e conexão com banco.
// Configura middlewares, rotas e start da aplicação.
//
// File: server.ts
// Purpose: Entry point da API REST.
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

app.get("/kafratoolset", (req, res) => {
  res.json({ message: "KafraToolset" })
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
    console.error("Erro na conexão do Database", error)
  })