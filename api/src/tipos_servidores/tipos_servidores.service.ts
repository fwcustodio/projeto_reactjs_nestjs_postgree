import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TiposServidoresService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createAcaoDto: Prisma.TiposServidoresCreateInput, req: any) {
    return await this.prisma.tiposServidores.create({
      data: { ...createAcaoDto },
    });
  }

  async findAll(
    query: string | null,
    PagintipoServidor: { PAG: number; QTD_POR_PAG: number },
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

    const Dados = await this.prisma.tiposServidores.findMany({
      ...Where,
      skip: PagintipoServidor.QTD_POR_PAG * (PagintipoServidor.PAG - 1),
      take: PagintipoServidor.QTD_POR_PAG,
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.tiposServidores.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findOne(id: number) {
    return await this.prisma.tiposServidores.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAcaoDto: Prisma.TiposServidoresUpdateInput) {
    return await this.prisma.tiposServidores.update({
      where: { id },
      data: updateAcaoDto,
    });
  }

  async remove(id: number) {
    let TipoServidor = await this.prisma.tiposServidores.findUnique({
      where: { id },
      include: { usuarios_tipos_servidores: true },
    });

    if (
      TipoServidor &&
      TipoServidor.usuarios_tipos_servidores &&
      TipoServidor.usuarios_tipos_servidores.length > 0
    ) {
      throw new Prisma.PrismaClientKnownRequestError(
        'Existem usuários cadastrados vinculados a este tipo de servidor',
        {
          code: 'P2003', // Código para violação de foreign key
          clientVersion: Prisma.prismaVersion.client,
        },
      );
    } else {
      return this.prisma.tiposServidores.delete({ where: { id } });
    }
  }
}
