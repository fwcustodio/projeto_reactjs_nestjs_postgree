import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartamentosService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(
    createDepartamentoDto: Prisma.DepartamentosCreateInput,
    req: any,
  ) {
    return await this.prisma.departamentos.create({
      data: { ...createDepartamentoDto },
    });
  }

  async findAll(
    query: string | null,
    Paginacao: { PAG: number; QTD_POR_PAG: number },
  ) {
    console.log('findAll');

    //console.log('query : ' + query);

    let Where = {};

    if (query) {
      Where = {
        where: {
          OR: [{ nome: { contains: query, mode: 'insensitive' } }],
        },
      };
    }

    const Dados = await this.prisma.departamentos.findMany({
      ...Where,
      skip: Paginacao.QTD_POR_PAG * (Paginacao.PAG - 1),
      take: Paginacao.QTD_POR_PAG,
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.departamentos.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findOne(id: number) {
    return await this.prisma.departamentos.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateDepartamentoDto: Prisma.DepartamentosUpdateInput,
  ) {
    return await this.prisma.departamentos.update({
      where: { id },
      data: updateDepartamentoDto,
    });
  }

  async remove(id: number) {
    let Departamento = await this.prisma.departamentos.findUnique({
      where: { id },
      include: { usuarios_departamentos: true },
    });

    if (
      Departamento &&
      Departamento.usuarios_departamentos &&
      Departamento.usuarios_departamentos.length > 0
    ) {
      throw new Prisma.PrismaClientKnownRequestError(
        'Existem usuários cadastrados vinculados a este departamento',
        {
          code: 'P2003', // Código para violação de foreign key
          clientVersion: Prisma.prismaVersion.client,
        },
      );
    } else {
      return this.prisma.departamentos.delete({ where: { id } });
    }
  }
}
