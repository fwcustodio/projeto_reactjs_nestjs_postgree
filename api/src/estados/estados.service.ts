import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EstadosService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createEstadoDto: Prisma.EstadosCreateInput, req: any) {
    return await this.prisma.estados.create({
      data: { ...createEstadoDto },
    });
  }

  async findAll() {
    return await this.prisma.estados.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.estados.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEstadoDto: Prisma.EstadosUpdateInput) {
    return await this.prisma.estados.update({
      where: { id },
      data: updateEstadoDto,
    });
  }

  remove(id: number) {
    return this.prisma.estados.delete({ where: { id } });
  }
}
