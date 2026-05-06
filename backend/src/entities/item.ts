// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a estrutura da tabela item.
// Mapeia propriedades e dados de disponibilidade (JSON) 
// utilizando decoradores do TypeORM.
//
// File: item.ts
// Purpose: Gerenciar dados e informações básicos.
// ============================================================================

import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Soldby } from "./soldby";

@Entity("item")
export class Item {
  @PrimaryColumn({ type: "int" })
  id!: number
  @Column({ type: "varchar", length: 255 })
  name!: string
  @Column({ type: "text", nullable: true })
  description!: string | null
  @Column({ type: "float", nullable: true })
  weight!: number | null

  @Column({ type: "text", nullable: true })
  imageUrl?: string;

  // @Column({ type: "json", nullable: true }) // REDUNDANCIA NÃO USAR EM PRODUÇÃO REAL 
  // soldBy!: object[] | null // REDUNDANCIA NÃO USAR EM PRODUÇÃO REAL 
  
  @OneToMany(() => Soldby, (soldby) => soldby.item)
  npcSales!: Soldby[];
}
