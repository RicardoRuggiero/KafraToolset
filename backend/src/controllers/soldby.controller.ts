// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Recebe requisições HTTP e delega as ações ao service
//
// File: soldby.controller.ts
// Purpose: Endpoints para gerenciar relação Item & NPC
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