import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CidadesService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createCidadeDto: Prisma.CidadesCreateInput, req: any) {
    return await this.prisma.cidades.create({
      data: { ...createCidadeDto },
    });
  }

  async findAll() {
    return await this.prisma.cidades.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.cidades.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCidadeDto: Prisma.CidadesUpdateInput) {
    return await this.prisma.cidades.update({
      where: { id },
      data: updateCidadeDto,
    });
  }

  remove(id: number) {
    return this.prisma.cidades.delete({ where: { id } });
  }
}
