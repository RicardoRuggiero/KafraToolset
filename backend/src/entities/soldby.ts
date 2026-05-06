// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a entidade intermediária Soldby.
// Responsável por representar a relação entre Item e NPC,
// incluindo informações adicionais como o preço de venda.
//
// Implementa relacionamento Many-to-One com Item e NPC,
// caracterizando uma relação Many-to-Many com atributos.
//
// File: soldby.ts
// Purpose: Gerenciar a associação entre itens e NPCs com dados de venda.
// ============================================================================

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item";
import { Npc } from "./npc";

@Entity("soldby")
export class Soldby {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: "int" })
    price!: number;
    @ManyToOne(() => Item, (item) => item.npcSales)
    item!: Item;
    @ManyToOne(() => Npc, (npc) => npc.itemSales)
    npc!: Npc;   
}
