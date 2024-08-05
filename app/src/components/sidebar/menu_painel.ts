import { ROUTES } from '../../routes';

const MenuPainel = [
  {
    name: 'SIRS - Início',
    url: `/${ROUTES.HOME_PAINEL}`,
    icon: 'icon-speedometer',
  },
  {
    name: 'Usuários',
    url: '/painel/usuarios',
    icon: 'icon-people',
  },
  {
    name: 'Produtos',
    url: '/painel/produtos',
    icon: 'icon-basket',
  },
  {
    name: 'Categorias',
    url: '/painel/categorias',
    icon: 'icon-tag',
  },
  {
    name: 'Pedidos',
    url: '/painel/pedidos',
    icon: 'icon-basket-loaded',
  },
  {
    name: 'Configurações',
    url: '/painel/configuracoes',
    icon: 'icon-settings',
  },
];

export default MenuPainel;
