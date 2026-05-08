// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Recebe requisições HTTP e delega as ações ao service.
//
// File: item.controller.ts
// Purpose: Endpoints CRUD de items.
// ============================================================================

import { Request, Response, NextFunction } from "express"
import * as itemService from "../services/item.service"

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await itemService.getAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const item = await itemService.getById(id)
    if (!item) throw { status: 404, message: "Item não encontrado" }
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    //seforArquivo
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    // NUMBER<p/ñviraStringCausado>form-data(multer) 
    if (data.weight !== undefined) {
      data.weight = Number(data.weight);
    }

    const item = await itemService.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    const item = await itemService.update(id, req.body)
    res.json(item)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id)
    await itemService.remove(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}