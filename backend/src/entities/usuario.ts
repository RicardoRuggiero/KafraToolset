// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Define a estrutura da tabela usuario
// Mapeia propriedades e dados de disponibilidade (JSON)
// utilizando decoradores do TypeORM.
//
// File: usuario.ts
// Purpose: Gerenciar dados e informações básicos
// ============================================================================

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column()
  senha!: string
}