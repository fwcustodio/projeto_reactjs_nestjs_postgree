import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { connect } from 'http2';
import { getArrayUpdateOperations } from 'src/utils';
import { parse } from 'path';

@Injectable()
export class UsuariosService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createUsuarioDto: Prisma.UsuariosCreateInput, req: any) {
    let Perfis =
      createUsuarioDto &&
      Array.isArray(createUsuarioDto.perfis) &&
      createUsuarioDto.perfis.length > 0
        ? { connect: createUsuarioDto.perfis }
        : {};

    let Funcionalidades = {};

    if (createUsuarioDto && createUsuarioDto.funcionalidades_acoes) {
      Funcionalidades = this.ajustarFuncionalidadesAcoes(
        createUsuarioDto.funcionalidades_acoes,
        'CAD',
      );
    }

    return await this.prisma.usuarios.create({
      data: {
        ...createUsuarioDto,
        perfis: { ...Perfis },
        funcionalidades_acoes: { ...Funcionalidades },
      },
      include: {
        perfis: true,
      },
    });
  }

  ajustarFuncionalidadesAcoes = (
    FuncionalidadesParm: Prisma.UsuariosFuncionalidadesCreateNestedManyWithoutUsuarioInput,
    OP = 'CAD',
  ) => {
    let Funcionalidades = {};
    let FuncionalidadesArray = [];

    if (
      FuncionalidadesParm &&
      Array.isArray(FuncionalidadesParm) &&
      FuncionalidadesParm.length > 0
    ) {
      for (let i = 0; i < FuncionalidadesParm.length; i++) {
        let Funcionalidade: any = FuncionalidadesParm[i];
        let Acoes = Funcionalidade.acoes;

        delete Funcionalidade.usuario_id;

        if (Acoes && Acoes.length > 0) {
          Funcionalidade.acoes = {
            connect: Acoes,
          };
        } else {
          delete Funcionalidade.acoes;
        }

        FuncionalidadesArray.push(Funcionalidade);
      }

      Funcionalidades = { create: FuncionalidadesArray };
      if (OP != 'CAD') Funcionalidades = { deleteMany: {}, ...Funcionalidades };
    }

    return Funcionalidades;
  };

  async findAll(
    query: string | null,
    situacao: string | null,
    perfil: string | null,
    Paginacao: { PAG: number; QTD_POR_PAG: number },
  ) {
    //console.log('query : ' + query);

    let Where = {};
    let QueryAnd: object[] = [];

    if (query) {
      QueryAnd = [
        {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { cpf: { contains: query, mode: 'insensitive' } },
          ],
        },
      ];
    }

    if (situacao) {
      QueryAnd.push({ situacao });
    }

    if (perfil) {
      QueryAnd.push({
        perfis: {
          some: {
            id: parseInt(perfil),
          },
        },
      });
    }

    if (QueryAnd.length > 0) {
      Where = {
        where: {
          AND: QueryAnd,
        },
      };
    }

    const Dados = await this.prisma.usuarios.findMany({
      ...Where,
      skip: Paginacao.QTD_POR_PAG * (Paginacao.PAG - 1),
      take: Paginacao.QTD_POR_PAG,
      include: {
        perfis: true,
      },
    });

    //Contar o total sem a paginação
    const Total = await this.prisma.usuarios.count({
      ...Where,
    });

    return { Dados, Total };
  }

  async findOne(id: number | null, cpf?: string) {
    return await this.prisma.usuarios.findUnique({
      where: id ? { id } : { cpf },
      include: {
        perfis: true,
        funcionalidades_acoes: { include: { acoes: true } },
      },
    });
  }

  async getTelasPermissoes(cpf: string) {
    return await this.prisma.usuarios.findUnique({
      where: { cpf },
      include: {
        perfis: true,

        funcionalidades_acoes: {
          include: { funcionalidade: true, acoes: true },
        },
      },
    });
  }

  async getDadosCombosUsuarios() {
    const Perfis = await this.prisma.perfis.findMany({});
    const Funcionalidades = await this.prisma.funcionalidades.findMany({
      where: {
        situacao: 'Ativo',
      },
      include: {
        acoes: true,
      },
    });
    const Orgaos = await this.prisma.orgaos.findMany({
      where: {
        situacao: 'Ativo',
      },
    });
    const TiposServidores = await this.prisma.tiposServidores.findMany({
      where: {
        situacao: 'Ativo',
      },
    });
    const Departamentos = await this.prisma.departamentos.findMany({
      where: {
        situacao: 'Ativo',
      },
    });

    let Combos = {
      perfis: Perfis,
      funcionalidades: Funcionalidades,
      orgaos: Orgaos,
      tipos_servidores: TiposServidores,
      departamentos: Departamentos,
    };
    return Combos;
  }

  async update(id: number, updateUsuarioDto: Prisma.UsuariosUpdateInput) {
    const UsuarioAntigoAux = await this.prisma.usuarios.findUnique({
      where: { id },
      select: { perfis: true },
    });

    let OperacoesUpdatePerfis = {};

    if (updateUsuarioDto && Array.isArray(updateUsuarioDto.perfis)) {
      const PerfisAntigos =
        UsuarioAntigoAux && UsuarioAntigoAux.perfis
          ? UsuarioAntigoAux.perfis
          : [];

      OperacoesUpdatePerfis = getArrayUpdateOperations(
        //conecta e desconecta o que for necessario
        PerfisAntigos,
        updateUsuarioDto.perfis,
      );
    }

    let OperacoesUpdateFuncionalidades = {};

    if (updateUsuarioDto && updateUsuarioDto.funcionalidades_acoes) {
      OperacoesUpdateFuncionalidades = this.ajustarFuncionalidadesAcoes(
        updateUsuarioDto.funcionalidades_acoes,
        'UPD',
      );
    }

    return await this.prisma.usuarios.update({
      where: { id },
      data: {
        ...updateUsuarioDto,
        perfis: OperacoesUpdatePerfis,
        funcionalidades_acoes: OperacoesUpdateFuncionalidades,
      },
      include: {
        perfis: true,
      },
    });
  }

  async atualizarAcesso(id: number | null, cpf?: string) {
    return await this.prisma.usuarios.update({
      where: id ? { id } : { cpf },
      data: {
        updated_at: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.usuarios.delete({ where: { id } });
  }
}
