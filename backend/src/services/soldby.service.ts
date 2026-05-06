// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Contém a lógica de negócio da relação entre Item e NPC.
//
// File: soldby.service.ts
// Purpose: Gerenciar vendas de itens por NPCs com regras de negócio.
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Soldby } from "../entities/soldby"
import { Item } from "../entities/item"
import { Npc } from "../entities/npc"

const repo = AppDataSource.getRepository(Soldby)
const itemRepo = AppDataSource.getRepository(Item)
const npcRepo = AppDataSource.getRepository(Npc)

export async function create(data: { itemId: number, npcId: number, price: number }) {

  // REGRA 1: preço válido
  if (data.price <= 0) {
    throw { status: 400, message: "Preço deve ser maior que zero" }
  }

  // buscar entidades
  const item = await itemRepo.findOneBy({ id: data.itemId })
  const npc = await npcRepo.findOneBy({ id: data.npcId })

  if (!item) throw { status: 404, message: "Item não encontrado" }
  if (!npc) throw { status: 404, message: "NPC não encontrado" }

  // REGRA 2: não duplicar venda
  const existing = await repo.findOne({
    where: {
      item: { id: data.itemId },
      npc: { id: data.npcId }
    },
    relations: ["item", "npc"]
  })

  if (existing) {
    throw { status: 400, message: "NPC já vende este item" }
  }

  // cria 
  const sold = repo.create({
    price: data.price,
    item,
    npc
  })

  return repo.save(sold)
}