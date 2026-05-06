// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// GLOBAL Error Middleware
// 400 = (Bad Request)
// 500 =(Internal Server Error)
//
// File: error.middleware.ts
// Purpose: Validar dados.
// ============================================================================

import { Request, Response, NextFunction } from "express"
import multer from "multer";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  // TRATA ERRO UPLOAD DE ARQUIVOS 
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: "Erro no upload: " + err.message
    })
  }
  if (err.message?.includes("Formato inválido")) {
    return res.status(400).json({
      error: err.message
    })
  }

  const status = err.status || 500
  const message = err.message || "Erro interno do servidor"

  res.status(status).json({
    error: message
  })
}