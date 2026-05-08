// ============================================================================
// KafraToolset - DatabaseRO 
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Script responsável por inicializar a conexão com o banco de dados
// e executar a sincronização das entidades via TypeORM.
//
// Ao iniciar o AppDataSource, o TypeORM cria ou atualiza automaticamente
// as tabelas com base nas entidades registradas, dependendo da flag
// `synchronize` definida no data-source
//
// File: createTables.ts
// Purpose: Criar e sincronizar a estrutura das tabelas no banco de dados
// ============================================================================

import { AppDataSource } from "./database/data-source";

async function createTables() {
    try {
        console.log("Conectando ao banco de dados.");
        await AppDataSource.initialize();
        console.log("Conexão estabelecida.");
        console.log("Sincronização de tabelas executada (verifique DB_SYNC).");
        await AppDataSource.destroy();
        console.log("Conexão encerrada.");
    } catch (error) {
        console.error("Erro durante a sincronização:", error);
    }
}

createTables();