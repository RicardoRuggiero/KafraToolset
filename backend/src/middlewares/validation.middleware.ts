// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Validação diretamente nas rotas
//
// File: validation.middleware.ts
// Purpose: Validar dados
// ============================================================================

import { Request, Response, NextFunction } from "express"

// ==========================
// ITEM VALIDATION
// ==========================
export function validateItem(req: Request, res: Response, next: NextFunction) {
  const { id, name, weight } = req.body

  // ID (opcional, mas se vier precisa ser número)
  if (id !== undefined && typeof id !== "number") {
    return res.status(400).json({ error: "ID deve ser número" })
  }

  // NAME (obrigatório e não pode ser vazio)
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Nome é obrigatório e não pode ser vazio" })
  }

  // WEIGHT (opcional, mas se vier precisa ser número)
  if (weight !== undefined && typeof weight !== "number") {
    return res.status(400).json({ error: "Weight deve ser número" })
  }

  next()
}

// ==========================
// NPC VALIDATION
// ==========================
export function validateNpc(req: Request, res: Response, next: NextFunction) {
  const { id, mapname, x, y } = req.body

  // ID obrigatório e válido
  if (id === undefined || typeof id !== "number") {
    return res.status(400).json({ error: "ID do NPC é obrigatório e deve ser número" })
  }

  // MAPNAME obrigatório e não vazio
  if (!mapname || typeof mapname !== "string" || mapname.trim() === "") {
    return res.status(400).json({ error: "Mapname é obrigatório" })
  }

  // COORDENADAS obrigatórias
  if (typeof x !== "number" || typeof y !== "number") {
    return res.status(400).json({ error: "Coordenadas inválidas" })
  }

  next()
}