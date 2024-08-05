-- CreateTable
CREATE TABLE "categorias_cnh" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "categorias_cnh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "codigo_ibge" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "uf" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados_civis" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "estados_civis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graus_escolaridade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "graus_escolaridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identidades_genero" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "identidades_genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "niveis_escolaridade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "niveis_escolaridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgaos_emissores_rg" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(10) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "orgaos_emissores_rg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orientacoes_sexuais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "orientacoes_sexuais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_logradouros" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tipos_logradouros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_raca_cor" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tipos_raca_cor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados" (
    "id" SERIAL NOT NULL,
    "codigo_ibge" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgaos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cnpj" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "orgaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_funcionalidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(100),
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "p_funcionalidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_acoes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "p_acoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_perfis" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(100),
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "p_perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_perfis_funcionalidades" (
    "id" SERIAL NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "funcionalidade_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "p_perfis_funcionalidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50),
    "matricula" VARCHAR(30),
    "tipo_servidor_id" INTEGER,
    "departamento_id" INTEGER,
    "orgao_id" INTEGER,
    "ultimo_acesso" TIMESTAMP(3),
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "p_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_usuarios_perfis" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    CONSTRAINT "p_usuarios_perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "p_usuarios_funcionalidades" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "funcionalidade_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "p_usuarios_funcionalidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_servidores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "situacao" VARCHAR(30) NOT NULL DEFAULT 'Ativo',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tipos_servidores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AcoesToPerfisFuncionalidades" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AcoesToUsuariosFuncionalidades" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AcoesToFuncionalidades" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cidades_codigo_ibge_key" ON "cidades"("codigo_ibge");

-- CreateIndex
CREATE INDEX "cidades_codigo_ibge_idx" ON "cidades"("codigo_ibge");

-- CreateIndex
CREATE UNIQUE INDEX "estados_codigo_ibge_key" ON "estados"("codigo_ibge");

-- CreateIndex
CREATE INDEX "estados_codigo_ibge_idx" ON "estados"("codigo_ibge");

-- CreateIndex
CREATE UNIQUE INDEX "departamentos_nome_key" ON "departamentos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "orgaos_nome_key" ON "orgaos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "orgaos_cnpj_key" ON "orgaos"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "p_funcionalidades_nome_key" ON "p_funcionalidades"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "p_acoes_nome_key" ON "p_acoes"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "p_perfis_nome_key" ON "p_perfis"("nome");

-- CreateIndex
CREATE INDEX "p_perfis_funcionalidades_perfil_id_funcionalidade_id_idx" ON "p_perfis_funcionalidades"("perfil_id", "funcionalidade_id");

-- CreateIndex
CREATE UNIQUE INDEX "p_usuarios_nome_key" ON "p_usuarios"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "p_usuarios_cpf_key" ON "p_usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "p_usuarios_email_key" ON "p_usuarios"("email");

-- CreateIndex
CREATE INDEX "p_usuarios_perfis_usuario_id_perfil_id_idx" ON "p_usuarios_perfis"("usuario_id", "perfil_id");

-- CreateIndex
CREATE INDEX "p_usuarios_funcionalidades_usuario_id_funcionalidade_id_idx" ON "p_usuarios_funcionalidades"("usuario_id", "funcionalidade_id");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_servidores_nome_key" ON "tipos_servidores"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "_AcoesToPerfisFuncionalidades_AB_unique" ON "_AcoesToPerfisFuncionalidades"("A", "B");

-- CreateIndex
CREATE INDEX "_AcoesToPerfisFuncionalidades_B_index" ON "_AcoesToPerfisFuncionalidades"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AcoesToUsuariosFuncionalidades_AB_unique" ON "_AcoesToUsuariosFuncionalidades"("A", "B");

-- CreateIndex
CREATE INDEX "_AcoesToUsuariosFuncionalidades_B_index" ON "_AcoesToUsuariosFuncionalidades"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AcoesToFuncionalidades_AB_unique" ON "_AcoesToFuncionalidades"("A", "B");

-- CreateIndex
CREATE INDEX "_AcoesToFuncionalidades_B_index" ON "_AcoesToFuncionalidades"("B");

-- AddForeignKey
ALTER TABLE "p_perfis_funcionalidades" ADD CONSTRAINT "p_perfis_funcionalidades_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "p_perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_perfis_funcionalidades" ADD CONSTRAINT "p_perfis_funcionalidades_funcionalidade_id_fkey" FOREIGN KEY ("funcionalidade_id") REFERENCES "p_funcionalidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios" ADD CONSTRAINT "p_usuarios_tipo_servidor_id_fkey" FOREIGN KEY ("tipo_servidor_id") REFERENCES "tipos_servidores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios" ADD CONSTRAINT "p_usuarios_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios" ADD CONSTRAINT "p_usuarios_orgao_id_fkey" FOREIGN KEY ("orgao_id") REFERENCES "orgaos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios_perfis" ADD CONSTRAINT "p_usuarios_perfis_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "p_usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios_perfis" ADD CONSTRAINT "p_usuarios_perfis_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "p_perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios_funcionalidades" ADD CONSTRAINT "p_usuarios_funcionalidades_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "p_usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p_usuarios_funcionalidades" ADD CONSTRAINT "p_usuarios_funcionalidades_funcionalidade_id_fkey" FOREIGN KEY ("funcionalidade_id") REFERENCES "p_funcionalidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcoesToPerfisFuncionalidades" ADD CONSTRAINT "_AcoesToPerfisFuncionalidades_A_fkey" FOREIGN KEY ("A") REFERENCES "p_acoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcoesToPerfisFuncionalidades" ADD CONSTRAINT "_AcoesToPerfisFuncionalidades_B_fkey" FOREIGN KEY ("B") REFERENCES "p_perfis_funcionalidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcoesToUsuariosFuncionalidades" ADD CONSTRAINT "_AcoesToUsuariosFuncionalidades_A_fkey" FOREIGN KEY ("A") REFERENCES "p_acoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcoesToUsuariosFuncionalidades" ADD CONSTRAINT "_AcoesToUsuariosFuncionalidades_B_fkey" FOREIGN KEY ("B") REFERENCES "p_usuarios_funcionalidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcoesToFuncionalidades" ADD CONSTRAINT "_AcoesToFuncionalidades_A_fkey" FOREIGN KEY ("A") REFERENCES "p_acoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcoesToFuncionalidades" ADD CONSTRAINT "_AcoesToFuncionalidades_B_fkey" FOREIGN KEY ("B") REFERENCES "p_funcionalidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
