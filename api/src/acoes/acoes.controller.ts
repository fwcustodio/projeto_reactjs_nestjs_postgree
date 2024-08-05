import { AcoesService } from './acoes.service';
import { Prisma } from '@prisma/client';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Res,
  Req,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Controller('acoes')
export class AcoesController {
  constructor(private readonly acoesService: AcoesService) {}

  @Post()
  create(@Body() createAcaoDto: Prisma.AcoesCreateInput) {
    return this.acoesService.create(createAcaoDto, null);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.findAux(req, res, null);
  }

  @Get('search/:query')
  async findAllSearch(
    @Req() req: Request,
    @Res() res: Response,
    @Param('query') query: string,
  ) {
    return await this.findAux(req, res, query);
  }

  @Get('ativas')
  async findAllAtivas() {
    return await this.acoesService.findAllAtivas();
  }

  //Pesquisa por paginação e por query
  findAux = async (req: Request, res: Response, query: string | null) => {
    const PAG = parseInt(req.get('x-pagina') || '1');
    const QTD_POR_PAG = parseInt(req.get('x-qtd-por-pagina') || '10');

    const Resp = await this.acoesService.findAll(query, {
      PAG,
      QTD_POR_PAG,
    });

    const { Dados, Total } = Resp;
    return res.set({ 'x-total-registros': Total }).json(Dados);
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acoesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcaoDto: Prisma.AcoesUpdateInput,
  ) {
    return this.acoesService.update(+id, updateAcaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acoesService.remove(+id);
  }
}
