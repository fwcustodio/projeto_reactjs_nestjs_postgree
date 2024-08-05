import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrgaosService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createOrgaoDto: Prisma.OrgaosCreateInput, req: any) {
    return await this.prisma.orgaos.create({
      data: { ...createOrgaoDto },
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

    const Dados = await this.prisma.orgaos.findMany({
      ...Where,
      skip: Paginacao.QTD_POR_PAG * (Paginacao.PAG - 1),
      take: Paginacao.QTD_POR_PAG,
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.orgaos.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findOne(id: number) {
    return await this.prisma.orgaos.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateOrgaoDto: Prisma.OrgaosUpdateInput) {
    return await this.prisma.orgaos.update({
      where: { id },
      data: updateOrgaoDto,
    });
  }

  async remove(id: number) {
    let Orgao = await this.prisma.orgaos.findUnique({
      where: { id },
      include: { usuarios_orgaos: true },
    });

    if (Orgao && Orgao.usuarios_orgaos && Orgao.usuarios_orgaos.length > 0) {
      throw new Prisma.PrismaClientKnownRequestError(
        'Existem usuários cadastrados vinculados a este orgão',
        {
          code: 'P2003', // Código para violação de foreign key
          clientVersion: Prisma.prismaVersion.client,
        },
      );
    } else {
      return this.prisma.orgaos.delete({ where: { id } });
    }
  }
}
