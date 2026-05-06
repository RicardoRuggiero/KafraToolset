// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a entidade NPC (Non-Player Character) do sistema.
// Representa personagens do jogo responsáveis por interações como venda
// de itens, posicionamento em mapas e identificação no mundo.
//
// File: npc.ts
// Purpose: Gerenciar dados estruturados de NPCs e suas relações com itens.
// ============================================================================

import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Soldby } from "./soldby";

@Entity("npc")
export class Npc {
    @PrimaryColumn()
    id!: number;
    @Column({ type: "varchar", length: 255, nullable: true })
    name!: string | null;
    @Column({ type: "varchar", length: 255 })
    mapname!: string;
    @Column({ type: "int" })
    x!: number;
    @Column({ type: "int" })
    y!: number;
    @Column({ type: "int" })
    job!: number;
    @Column({ type: "varchar", length: 50 })
    type!: string;
    @OneToMany(() => Soldby, (Soldby) => Soldby.npc)
    itemSales!: Soldby[];
}
