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
import { DepartamentosService } from './departamentos.service';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  create(@Body() createDepartamentoDto: Prisma.DepartamentosCreateInput) {
    return this.departamentosService.create(createDepartamentoDto, null);
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

    const Resp = await this.departamentosService.findAll(query, {
      PAG,
      QTD_POR_PAG,
    });

    const { Dados, Total } = Resp;
    return res.set({ 'x-total-registros': Total }).json(Dados);
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartamentoDto: Prisma.DepartamentosUpdateInput,
  ) {
    return this.departamentosService.update(+id, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentosService.remove(+id);
  }
}
