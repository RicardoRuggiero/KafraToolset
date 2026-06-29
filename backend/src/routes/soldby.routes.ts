// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define os endpoints e conecta com o controller
//
// File: soldby.routes.ts
// Purpose: Mapear rotas REST para operações de relação Item ↔ NPC
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/soldby.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()
// CRIA
router.post("/", authMiddleware, controller.create)

//REMOVE
router.delete(
  "/item/:itemId",
  authMiddleware,
  controller.removeByItem
);

router.delete(
  "/npc/:npcId",
  authMiddleware,
  controller.removeByNpc
);

//BUSCAR
router.get(
  "/item/:itemId",
  authMiddleware,
  controller.getDependenciesByItem
);

router.get(
  "/npc/:npcId",
  authMiddleware,
  controller.getDependenciesByNpc
);

export default router