import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PerfisService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createPerfilDto: Prisma.PerfisCreateInput, req: any) {
    let CreateFuncionalidadesAcoes = {};

    if (
      createPerfilDto &&
      createPerfilDto.funcionalidades &&
      Array.isArray(createPerfilDto.funcionalidades)
    ) {
      let Funcionalidades = createPerfilDto.funcionalidades;

      for (let i = 0; i < Funcionalidades.length; i++) {
        const FuncionalidadeAcoes = Funcionalidades[i];
        if (FuncionalidadeAcoes.acoes && FuncionalidadeAcoes.acoes.length > 0) {
          Funcionalidades[i].acoes = {
            connect: FuncionalidadeAcoes.acoes,
          };
        } else {
          delete Funcionalidades[i].acoes;
        }
      }

      CreateFuncionalidadesAcoes = {
        create: Funcionalidades,
      };
    }

    return await this.prisma.perfis.create({
      data: {
        ...createPerfilDto,
        funcionalidades: CreateFuncionalidadesAcoes,
      },
    });
  }

  async findAll(
    query: string | null,
    situacao: string | null,
    Paginacao: { PAG: number; QTD_POR_PAG: number },
  ) {
    let Where = {};

    if (query && situacao) {
      //console.log('query : ' + query);
      //console.log('situacao : ' + situacao);

      Where = {
        where: {
          AND: [
            { situacao },
            {
              OR: [{ nome: { contains: query, mode: 'insensitive' } }],
            },
          ],
        },
      };
    } else if (query || situacao) {
      Where = {
        where: {
          OR: [
            situacao ? { situacao } : {},
            query
              ? {
                  OR: [{ nome: { contains: query, mode: 'insensitive' } }],
                }
              : {},
          ],
        },
      };
    }

    const Dados = await this.prisma.perfis.findMany({
      ...Where,
      skip: Paginacao.QTD_POR_PAG * (Paginacao.PAG - 1),
      take: Paginacao.QTD_POR_PAG,
      //include: {        funcionalidades: { include: {  funcionalidade: true, acoes: true } },      },
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.perfis.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findAtivos() {
    return await this.prisma.perfis.findMany({
      where: { situacao: 'Ativo' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.perfis.findUnique({
      where: { id },
      include: {
        funcionalidades: { include: { acoes: true } },
      },
    });
  }

  async update(id: number, updatePerfilDto: Prisma.PerfisUpdateInput) {
    let UpdateFuncionalidadesAcoes = {};

    if (
      updatePerfilDto &&
      updatePerfilDto.funcionalidades &&
      Array.isArray(updatePerfilDto.funcionalidades)
    ) {
      let Funcionalidades = updatePerfilDto.funcionalidades;

      for (let i = 0; i < Funcionalidades.length; i++) {
        const FuncionalidadeAcoes = Funcionalidades[i];

        delete Funcionalidades[i].id;
        delete Funcionalidades[i].perfil_id;

        if (FuncionalidadeAcoes.acoes && FuncionalidadeAcoes.acoes.length > 0) {
          Funcionalidades[i].acoes = {
            connect: FuncionalidadeAcoes.acoes,
          };
        } else {
          delete Funcionalidades[i].acoes;
        }
      }

      UpdateFuncionalidadesAcoes = {
        deleteMany: {},
        create: Funcionalidades,
      };
    }

    return await this.prisma.perfis.update({
      where: { id },
      data: {
        ...updatePerfilDto,
        funcionalidades: UpdateFuncionalidadesAcoes,
      },
      include: {
        funcionalidades: { include: { funcionalidade: true, acoes: true } },
      },
    });
  }

  async remove(id: number) {
    let Perfil = await this.prisma.perfis.findUnique({
      where: { id },
      include: { usuarios_perfis: true },
    });

    if (Perfil && Perfil.usuarios_perfis && Perfil.usuarios_perfis.length > 0) {
      throw new Prisma.PrismaClientKnownRequestError(
        'Existem usuários cadastrados vinculados a este perfil',
        {
          code: 'P2003', // Código para violação de foreign key
          clientVersion: Prisma.prismaVersion.client,
        },
      );
    } else {
      return this.prisma.perfis.delete({ where: { id } });
    }
  }
}
