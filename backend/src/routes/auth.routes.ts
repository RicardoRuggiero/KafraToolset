// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Rotas de Autenticação.
// Define os endpoints e conecta com o controller.
//
// File: auth.routes.ts
// Purpose: Mapear rotas REST para operações de login e geração de token.
// ============================================================================

import { Router } from "express";
import * as controller from "../controllers/auth.controller";

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;