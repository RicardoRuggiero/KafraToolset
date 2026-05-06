// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Lógica de criação e acesso ao banco
//
// File: login.service.ts
// Purpose: Serviço de autenticação de usuários.
// ============================================================================

import { AppDataSource } from "../database/data-source"
import { Usuario } from "../entities/usuario"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido");
}

const SECRET = process.env.JWT_SECRET;
const repo = AppDataSource.getRepository(Usuario)

// CADASTRO
export async function register(email: string, senha: string) {

  const existing = await repo.findOneBy({ email })
  if (existing) {
    throw { status: 400, message: "Email já cadastrado" }
  }

  const hash = await bcrypt.hash(senha, 10)

  const user = repo.create({
    email,
    senha: hash
  })

  return repo.save(user)
}

// ACESSO 
export async function login(email: string, senha: string) {

  const user = await repo.findOneBy({ email })

  if (!user) {
    throw { status: 401, message: "Credenciais inválidas" }
  }

  const senhaValida = await bcrypt.compare(senha, user.senha)

  if (!senhaValida) {
    throw { status: 401, message: "Credenciais inválidas" }
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  )

  return { token }
}