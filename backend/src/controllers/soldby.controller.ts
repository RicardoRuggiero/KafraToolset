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

//CRIA
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await soldbyService.create(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

//REMOVER
export async function removeByItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const itemId = Number(req.params.itemId);

    await soldbyService.removeByItem(itemId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function removeByNpc(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const npcId = Number(req.params.npcId);

    await soldbyService.removeByNpc(npcId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// BUSCAR
export async function getDependenciesByItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const itemId = Number(
      req.params.itemId
    );

    const result =
      await soldbyService.getByItem(
        itemId
      );

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getDependenciesByNpc(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const npcId = Number(
      req.params.npcId
    );

    const result =
      await soldbyService.getByNpc(
        npcId
      );

    res.json(result);
  } catch (err) {
    next(err);
  }
}