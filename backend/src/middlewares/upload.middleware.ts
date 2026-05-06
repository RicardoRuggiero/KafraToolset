// ============================================================================
// KafraToolset - DatabaseRO
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Middleware de Upload de Arquivos (Multer)
// - Armazenar imagens no servidor (pasta uploads)
// - Gerar nome único para arquivos
// - Validar tipo de arquivo (imagem)
//
// File: upload.middleware.ts
// Purpose: Gerenciar upload de imagens via multipart/form-data.
// ============================================================================

import multer from "multer";
import path from "path";

// configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; //segurança-integridade
    cb(null, filename);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato inválido (png, jpg, jpeg, webp)"));
    }

    cb(null, true);
  }
});