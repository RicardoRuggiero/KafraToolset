// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Registrar todas as requisições HTTP recebidas pela API
// Exibir método (GET, POST, PUT, DELETE) e URL acessada
// Auxiliar no debug e monitoramento da aplicação
//
// File: logger.middleware.ts
// Purpose: Logar requisições HTTP no console durante execução do servidor
// ============================================================================

import { Request, Response, NextFunction } from "express"

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url}`)
  next()
}