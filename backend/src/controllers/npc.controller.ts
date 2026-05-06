// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Controller de NPC.
// Responsável por receber requisições HTTP e delegar as ações ao service.
//
// File: npc.controller.ts
// Purpose: Endpoints CRUD de NPC.
// ============================================================================

import { Request, Response, NextFunction } from "express"
import * as npcService from "../services/npc.service"

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await npcService.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const data = await npcService.getById(id)
    if (!data) throw { status: 404, message: "NPC não encontrado" }
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await npcService.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const data = await npcService.update(id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    await npcService.remove(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}