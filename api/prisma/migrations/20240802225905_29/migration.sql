/*
  Warnings:

  - You are about to drop the `p_usuarios_perfis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "p_usuarios_perfis" DROP CONSTRAINT "p_usuarios_perfis_perfil_id_fkey";

-- DropForeignKey
ALTER TABLE "p_usuarios_perfis" DROP CONSTRAINT "p_usuarios_perfis_usuario_id_fkey";

-- DropTable
DROP TABLE "p_usuarios_perfis";

-- CreateTable
CREATE TABLE "_PerfisToUsuarios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PerfisToUsuarios_AB_unique" ON "_PerfisToUsuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_PerfisToUsuarios_B_index" ON "_PerfisToUsuarios"("B");

-- AddForeignKey
ALTER TABLE "_PerfisToUsuarios" ADD CONSTRAINT "_PerfisToUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "p_perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfisToUsuarios" ADD CONSTRAINT "_PerfisToUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "p_usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
