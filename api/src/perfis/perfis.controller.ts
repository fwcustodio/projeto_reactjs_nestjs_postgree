import { PerfisService } from './perfis.service';
import { Prisma } from '@prisma/client';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  @Post()
  create(@Body() createPerfilDto: Prisma.PerfisCreateInput) {
    return this.perfisService.create(createPerfilDto, null);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.findAux(req, res, null, null);
  }

  @Get('ativos')
  async findAllAtivos() {
    return this.perfisService.findAtivos();
  }

  @Get('search/:query')
  async findAllSearch(
    @Req() req: Request,
    @Res() res: Response,
    @Param('query') query: string,
  ) {
    return await this.findAux(req, res, query, null);
  }

  @Get('search/:query/:situacao')
  async findAllSearchSituacao(
    @Req() req: Request,
    @Res() res: Response,
    @Param('query') query: string,
    @Param('situacao') situacao: string,
  ) {
    let QueryAux = query == 'null' ? null : query;
    let SituacaoAux = situacao == 'null' ? null : situacao;

    return await this.findAux(req, res, QueryAux, SituacaoAux);
  }

  //Pesquisa por paginação e por query
  findAux = async (
    req: Request,
    res: Response,
    query: string | null,
    situacao: string | null,
  ) => {
    const PAG = parseInt(req.get('x-pagina') || '1');
    const QTD_POR_PAG = parseInt(req.get('x-qtd-por-pagina') || '10');

    const Resp = await this.perfisService.findAll(query, situacao, {
      PAG,
      QTD_POR_PAG,
    });

    const { Dados, Total } = Resp;
    return res.set({ 'x-total-registros': Total }).json(Dados);
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerfilDto: Prisma.PerfisUpdateInput,
  ) {
    return this.perfisService.update(+id, updatePerfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfisService.remove(+id);
  }
}
