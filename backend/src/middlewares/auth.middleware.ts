// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Middleware de Autenticação
//
// File: auth.middleware.ts
// Purpose: Validar o JWT nas rotas protegidas.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido");
}

const SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
}