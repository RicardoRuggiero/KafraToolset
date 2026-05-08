// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Receber requisições HTTP de autenticação e delegar ao service.
//
// File: auth.controller.ts
// Purpose: Endpoint para login de usuários.
// ============================================================================

import { Request, Response, NextFunction } from "express";
import * as loginService from "../services/login.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha } = req.body;
    const result = await loginService.login(email, senha);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha, secret } = req.body;

    if (secret !== process.env.REGISTER_SECRET) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const user = await loginService.register(email, senha);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}