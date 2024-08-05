import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AcoesService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createAcaoDto: Prisma.AcoesCreateInput, req: any) {
    return await this.prisma.acoes.create({
      data: { ...createAcaoDto },
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

    const Dados = await this.prisma.acoes.findMany({
      ...Where,
      skip: Paginacao.QTD_POR_PAG * (Paginacao.PAG - 1),
      take: Paginacao.QTD_POR_PAG,
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.acoes.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findAllAtivas() {
    return await this.prisma.acoes.findMany({
      where: {
        situacao: 'Ativo',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.acoes.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAcaoDto: Prisma.AcoesUpdateInput) {
    return await this.prisma.acoes.update({
      where: { id },
      data: updateAcaoDto,
    });
  }

  remove(id: number) {
    return this.prisma.acoes.delete({ where: { id } });
  }
}
