import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

import { getArrayUpdateOperations } from '../utils';

@Injectable()
export class FuncionalidadesService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createTelaDto: Prisma.FuncionalidadesCreateInput, req: any) {
    let Acoes = {};

    if (createTelaDto && Array.isArray(createTelaDto.acoes)) {
      Acoes = { connect: createTelaDto.acoes };
    }

    return await this.prisma.funcionalidades.create({
      data: {
        ...createTelaDto,
        acoes: Acoes,
      },
      include: {
        acoes: true,
      },
    });
  }

  async findAll(
    query: string | null,
    Paginacao: { PAG: number; QTD_POR_PAG: number },
  ) {
    //console.log('query : ' + query);

    let Where = {};

    if (query) {
      Where = {
        where: {
          OR: [{ nome: { contains: query, mode: 'insensitive' } }],
        },
      };
    }

    const Dados = await this.prisma.funcionalidades.findMany({
      ...Where,
      skip: Paginacao.QTD_POR_PAG * (Paginacao.PAG - 1),
      take: Paginacao.QTD_POR_PAG,
      include: {
        acoes: true,
      },
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.funcionalidades.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findAllAtivas() {
    return await this.prisma.funcionalidades.findMany({
      where: {
        situacao: 'Ativo',
      },
      include: {
        acoes: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.funcionalidades.findUnique({
      where: { id },
      include: {
        acoes: true,
      },
    });
  }

  async update(id: number, updateTelaDto: Prisma.FuncionalidadesUpdateInput) {
    const FuncionalidadeAntigaAux =
      await this.prisma.funcionalidades.findUnique({
        where: { id },
        select: { acoes: true },
      });

    let OperacoesUpdateAcoes = {};

    if (updateTelaDto && Array.isArray(updateTelaDto.acoes)) {
      const AcoesAntigas =
        FuncionalidadeAntigaAux && FuncionalidadeAntigaAux.acoes
          ? FuncionalidadeAntigaAux.acoes
          : [];

      OperacoesUpdateAcoes = getArrayUpdateOperations(
        //conecta e desconecta o que for necessario
        AcoesAntigas,
        updateTelaDto.acoes,
      );
    }

    return await this.prisma.funcionalidades.update({
      where: { id },
      data: {
        ...updateTelaDto,
        acoes: OperacoesUpdateAcoes,
      },
      include: {
        acoes: true,
      },
    });
  }

  async remove(id: number) {
    let Funcionalidade = await this.prisma.funcionalidades.findUnique({
      where: { id },
      include: { perfis_telas: true, usuarios_telas: true },
    });

    if (Funcionalidade) {
      if (
        Funcionalidade.perfis_telas &&
        Funcionalidade.perfis_telas.length > 0
      ) {
        throw new Prisma.PrismaClientKnownRequestError(
          'Existem perfis cadastrados vinculados a esta funcionalidade',
          {
            code: 'P2003', // Use um código apropriado ou crie um código personalizado.
            clientVersion: Prisma.prismaVersion.client,
          },
        );
      }

      if (
        Funcionalidade.usuarios_telas &&
        Funcionalidade.usuarios_telas.length > 0
      ) {
        throw new Prisma.PrismaClientKnownRequestError(
          'Existem usuários cadastrados vinculados a esta funcionalidade',
          {
            code: 'P2003', // Código para violação de foreign key
            clientVersion: Prisma.prismaVersion.client,
          },
        );
      }
    }

    return this.prisma.funcionalidades.delete({ where: { id } });
  }
}
