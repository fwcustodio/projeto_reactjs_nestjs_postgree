import { UsuariosService } from './usuarios.service';
import { PerfisService } from '../perfis/perfis.service';
import { FuncionalidadesService } from '../funcionalidades/funcionalidades.service';
import { OrgaosService } from '../orgaos/orgaos.service';
import { TiposServidoresService } from '../tipos_servidores/tipos_servidores.service';
import { DepartamentosService } from '../departamentos/departamentos.service';

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

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: Prisma.UsuariosCreateInput) {
    return this.usuariosService.create(createUsuarioDto, null);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.findAux(req, res, null, null, null);
  }

  @Get('search/:query')
  async findAllSearch(
    @Req() req: Request,
    @Res() res: Response,
    @Param('query') query: string,
  ) {
    return await this.findAux(req, res, query, null, null);
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
    return await this.findAux(req, res, QueryAux, SituacaoAux, null);
  }

  @Get('search/:query/:situacao/:perfil')
  async findAllSearchSituacaoPerfil(
    @Req() req: Request,
    @Res() res: Response,
    @Param('query') query: string,
    @Param('situacao') situacao: string,
    @Param('perfil') perfil: string,
  ) {
    let QueryAux = query == 'null' ? null : query;
    let SituacaoAux = situacao == 'null' ? null : situacao;
    let PerfilAux = perfil == 'null' ? null : perfil;
    return await this.findAux(req, res, QueryAux, SituacaoAux, PerfilAux);
  }

  //Pesquisa por paginação e por query
  findAux = async (
    req: Request,
    res: Response,
    query: string | null,
    situacao: string | null,
    perfil: string | null,
  ) => {
    const PAG = parseInt(req.get('x-pagina') || '1');
    const QTD_POR_PAG = parseInt(req.get('x-qtd-por-pagina') || '10');

    const Resp = await this.usuariosService.findAll(query, situacao, perfil, {
      PAG,
      QTD_POR_PAG,
    });

    const { Dados, Total } = Resp;
    return res.set({ 'x-total-registros': Total }).json(Dados);
  };

  @Get('dados-combos')
  async getDadosCombosUsuarios() {
    return this.usuariosService.getDadosCombosUsuarios();
  }

  @Get('/permissoes/:cpf')
  async findOneTelasPermissoes(@Param('cpf') cpf: string) {
    return await this.usuariosService.getTelasPermissoes(cpf);
  }

  @Get('/atualizar-acesso/:id')
  async atualizarAcesso(@Param('id') id: string) {
    return await this.usuariosService.atualizarAcesso(+id);
  }

  @Get(':id/:cpf')
  findOneCPF(@Param('id') id: string, @Param('cpf') cpf: string) {
    return this.usuariosService.findOne(null, cpf);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: Prisma.UsuariosUpdateInput,
  ) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
