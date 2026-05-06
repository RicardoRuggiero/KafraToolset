// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define os endpoints e conecta com o controller.
//
// File: soldby.routes.ts
// Purpose: Mapear rotas REST para operações de relação Item ↔ NPC.
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/soldby.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
// SOMENTE LOGADO && SOMENTE CRIA
router.post("/", authMiddleware, controller.create)

export default router