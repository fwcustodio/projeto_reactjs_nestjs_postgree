import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstadosService } from './estados.service';
import { Prisma } from '@prisma/client';

@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  create(@Body() createEstadoDto: Prisma.EstadosCreateInput) {
    return this.estadosService.create(createEstadoDto, null);
  }

  @Get()
  findAll() {
    return this.estadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstadoDto: Prisma.EstadosUpdateInput,
  ) {
    return this.estadosService.update(+id, updateEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosService.remove(+id);
  }
}
