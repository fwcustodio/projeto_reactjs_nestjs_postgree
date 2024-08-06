import React from 'react';
import SystemCheck from '../pages/system/check';
import NotFoundPage from '../pages/not_found_page';

// Painel
import HomePainel from '../pages/home_painel';

import Usuarios from '../pages/usuarios';
import UsuariosAlterar from '../pages/usuarios_alterar';

import Perfis from '../pages/perfis';
import PerfisAlterar from '../pages/perfis_alterar';

import Departamentos from '../pages/departamentos';
import DepartamentosAlterar from '../pages/departamentos_alterar';

import OrgaosEmpresas from '../pages/orgaos_empresas';
import OrgaosEmpresasAlterar from '../pages/orgaos_empresas_alterar';

import PerfilAcoes from '../pages/acoes';
import PerfilAcoesAlterar from '../pages/acoes_alterar';

import Funcionalidades from '../pages/funcionalidades';
import FuncionalidadesAlterar from '../pages/funcionalidades_alterar';

import TiposServidor from '../pages/tipos_servidores';
import TiposServidorAlterar from '../pages/tipos_servidores_alterar';

import SemPermissao from '../pages/sem_permissao';

export interface RouteConfig {
  path: string;
  element: React.ComponentType<any>; // Update the type of 'element' property
  exact?: boolean;
}

const PrefixoAdmin = '/painel';

export const ROUTES = {
  SEM_PERMISSAO: `/sem_permissao`,
  SYSTEM_CHECK: `/system/check`,
  USUARIOS: `${PrefixoAdmin}/usuarios`,
  PERFIS: `${PrefixoAdmin}/perfis`,
  DEPARTAMENTOS: `${PrefixoAdmin}/departamentos`,
  ORGAOS_EMPRESAS: `${PrefixoAdmin}/orgaos_empresas`,
  ACOES: `${PrefixoAdmin}/acoes`,
  FUNCIONALIDADES: `${PrefixoAdmin}/funcionalidades`,
  TIPOS_SERVIDORES: `${PrefixoAdmin}/tipos_servidor`,

  //painel

  HOME_PAINEL: `${PrefixoAdmin}`,
};

const RoutesConfig: RouteConfig[] = [
  {
    path: '*',
    element: NotFoundPage,
  },

  {
    path: ROUTES.SYSTEM_CHECK,
    element: SystemCheck,
  },

  {
    path: '/', // home painel
    element: HomePainel,
  },

  {
    path: ROUTES.HOME_PAINEL, // home painel
    element: HomePainel,
  },

  {
    path: ROUTES.USUARIOS,
    element: Usuarios,
  },
  {
    path: ROUTES.USUARIOS + '/:id?/:modo',
    element: UsuariosAlterar,
  },
  {
    path: ROUTES.PERFIS,
    element: Perfis,
  },
  {
    path: ROUTES.PERFIS + '/:id?/:modo',
    element: PerfisAlterar,
  },
  {
    path: ROUTES.DEPARTAMENTOS,
    element: Departamentos,
  },
  {
    path: ROUTES.DEPARTAMENTOS + '/:id?/:modo',
    element: DepartamentosAlterar,
  },

  {
    path: ROUTES.ORGAOS_EMPRESAS,
    element: OrgaosEmpresas,
  },
  {
    path: ROUTES.ORGAOS_EMPRESAS + '/:id?/:modo',
    element: OrgaosEmpresasAlterar,
  },
  {
    path: ROUTES.ACOES,
    element: PerfilAcoes,
  },
  {
    path: ROUTES.ACOES + '/:id?/:modo',
    element: PerfilAcoesAlterar,
  },
  {
    path: ROUTES.FUNCIONALIDADES,
    element: Funcionalidades,
  },
  {
    path: ROUTES.FUNCIONALIDADES + '/:id?/:modo',
    element: FuncionalidadesAlterar,
  },

  {
    path: ROUTES.TIPOS_SERVIDORES,
    element: TiposServidor,
  },
  {
    path: ROUTES.TIPOS_SERVIDORES + '/:id?/:modo',
    element: TiposServidorAlterar,
  },
  {
    path: ROUTES.SEM_PERMISSAO,
    element: SemPermissao,
  },
];

export default RoutesConfig;
