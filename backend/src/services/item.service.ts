// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// lógica de negócio e Acesso ao DB via TypeORM
//
// File: item.service.ts
// Purpose: Executar operações CRUD na entidade Item
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Item } from "../entities/item"

const repo = AppDataSource.getRepository(Item)

export async function getAll() {
  return repo.find()
}

export async function getById(id: number) {
  return repo.findOneBy({ id })
}

export async function create(data: Partial<Item>) {
  const item = repo.create(data)
  return repo.save(item)
}

export async function update(id: number, data: Partial<Item>) {
  const item = await repo.findOneBy({ id })
  if (!item) {
    throw { status: 404, message: "Item não encontrado" }
  }

  repo.merge(item, data)
  return repo.save(item)
}

export async function remove(id: number) {
  const result = await repo.delete(id)

  if (result.affected === 0) {
    throw { status: 404, message: "Item não encontrado" }
  }

  return true
}