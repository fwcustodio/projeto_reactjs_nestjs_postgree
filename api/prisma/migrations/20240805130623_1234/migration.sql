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

-- CreateIndex
CREATE UNIQUE INDEX "estados_codigo_ibge_key" ON "estados"("codigo_ibge");

-- CreateIndex
CREATE INDEX "estados_codigo_ibge_idx" ON "estados"("codigo_ibge");
