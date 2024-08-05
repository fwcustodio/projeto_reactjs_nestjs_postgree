import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { Prisma } from '@prisma/client';

@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  createAtt(@Body() createCidadeDto: Prisma.CidadesCreateInput) {
    return this.cidadesService.create(createCidadeDto, null);
  }

  /*
  //PARA IMPORTAÇÃO DE JSON DE CIDADES

  @Post()
  create(@Body() ArrayCidadeDto: any[]) {
    for (let index = 0; index < ArrayCidadeDto.length; index++) {
      const Item = ArrayCidadeDto[index];
      let CidadeItem = new CreateCidadeDto();

      CidadeItem.codigo_ibge = Item.Codigo;
      CidadeItem.descricao = Item.Nome;
      CidadeItem.uf = Item.Uf;

      console.log('codigo_ibge : ' + CidadeItem.codigo_ibge);
      console.log('descricao : ' + CidadeItem.descricao);

      this.cidadesService.create(CidadeItem, null);
    }

    return true;
  }  */

  @Get()
  findAll() {
    return this.cidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCidadeDto: Prisma.CidadesUpdateInput,
  ) {
    return this.cidadesService.update(+id, updateCidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadesService.remove(+id);
  }
}
