import { OrgaosService } from './orgaos.service';

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
import { Prisma } from '@prisma/client';

@Controller('orgaos')
export class OrgaosController {
  constructor(private readonly orgaosService: OrgaosService) {}

  @Post()
  create(@Body() createOrgaoDto: Prisma.OrgaosCreateInput) {
    return this.orgaosService.create(createOrgaoDto, null);
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

  //Pesquisa por paginação e por query
  findAux = async (req: Request, res: Response, query: string | null) => {
    const PAG = parseInt(req.get('x-pagina') || '1');
    const QTD_POR_PAG = parseInt(req.get('x-qtd-por-pagina') || '10');

    const Resp = await this.orgaosService.findAll(query, {
      PAG,
      QTD_POR_PAG,
    });

    const { Dados, Total } = Resp;
    return res.set({ 'x-total-registros': Total }).json(Dados);
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orgaosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrgaoDto: Prisma.OrgaosUpdateInput,
  ) {
    return this.orgaosService.update(+id, updateOrgaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orgaosService.remove(+id);
  }
}
