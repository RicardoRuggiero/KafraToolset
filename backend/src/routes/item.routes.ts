// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Rotas de Items.
// Define os endpoints e conecta com o controller.
//
// File: item.routes.ts
// Purpose: Mapear rotas REST para operações de items.
// ============================================================================

import { Router } from "express"
import * as controller from "../controllers/item.controller"
// import { validateItem } from "../middlewares/validation.middleware" // PODE DAR CONFLITO DE BIBLIOTECA
import { authMiddleware } from "../middlewares/auth.middleware" // CHECK
import { upload } from "../middlewares/upload.middleware"; // BINÁRIO

const router = Router()
// FREE
router.get("/", controller.getAll)
router.get("/:id", controller.getById)
// CONTROLE
router.post("/", authMiddleware, upload.single("image"), controller.create)
router.put("/:id", authMiddleware, controller.update)
router.delete("/:id", authMiddleware, controller.remove)

export default router