// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Funções exportadas da service para a controller.
//
// File: npc.service.ts
// Purpose: CRUD de NPC.
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Npc } from "../entities/npc"

const repo = AppDataSource.getRepository(Npc)

export async function getAll() {
  return repo.find()
}

export async function getById(id: number) {
  return repo.findOneBy({ id })
}

export async function create(data: Partial<Npc>) {
  const npc = repo.create(data)
  return repo.save(npc)
}

export async function update(id: number, data: Partial<Npc>) {
  const npc = await repo.findOneBy({ id })
  if (!npc) {
    throw { status: 404, message: "NPC não encontrado" }
  }

  repo.merge(npc, data)
  return repo.save(npc)
}

export async function remove(id: number) {
  const result = await repo.delete(id)

  if (result.affected === 0) {
    throw { status: 404, message: "NPC não encontrado" }
  }

  return true
}