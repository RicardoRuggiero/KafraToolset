// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
// Rotas de NPC.
//
// File: npc.routes.ts
// Purpose: Mapear endpoints de NPC.
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/npc.controller"
import { validateNpc } from "../middlewares/validation.middleware"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
// FREE
router.get("/", controller.getAll)
router.get("/:id", controller.getById)
// CHECK PASS LOGIN
router.post("/", authMiddleware, validateNpc, controller.create)
router.put("/:id", authMiddleware, validateNpc, controller.update)
router.delete("/:id", authMiddleware, controller.remove)

export default router