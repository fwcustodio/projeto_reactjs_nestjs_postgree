import axios from 'axios';

const CustomAxios = axios.create();

const toCamelCase: any = (object: any) => {
  let transformedObject = object;
  if (typeof object === 'object' && object !== null) {
    if (object instanceof Array) {
      transformedObject = object.map(toCamelCase);
    } else {
      transformedObject = {};
      for (const key in object) {
        if (object[key] !== undefined) {
          const newKey = key.replace(/(_\w)|(-\w)/g, (k) => k[1].toUpperCase());
          transformedObject[newKey] = toCamelCase(object[key]);
        }
      }
    }
  }
  return transformedObject;
};

export const toSnackCase: any = (object: any) => {
  let transformedObject = object;
  if (typeof object === 'object' && object !== null) {
    if (object instanceof Array) {
      transformedObject = object.map(toSnackCase);
    } else {
      transformedObject = {};
      for (const key in object) {
        if (object[key] !== undefined) {
          const newKey = key
            .replace(/\.?([A-Z]+)/g, function (_, y) {
              return '_' + y.toLowerCase();
            })
            .replace(/^_/, '');
          transformedObject[newKey] = toSnackCase(object[key]);
        }
      }
    }
  }
  return transformedObject;
};

CustomAxios.interceptors.response.use(
  (response) => {
    response.data = toCamelCase(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

CustomAxios.interceptors.request.use(
  (config) => {
    config.data = toSnackCase(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default CustomAxios;

export function openSidebar() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
  }
}

export function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue('--SideNavigation-slideIn');
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export const FONT_SIZE = {
  verySmall: 6,
  small: 8,
  smallLarge: 10,
  medium: 12,
  mediumLarge: 14,
  large: 18,
  extraLarge: 20,
};

export const MODOS = {
  LISTAR: 'listar',
  CADASTRAR: 'cadastrar',
  VISUALIZAR: 'visualizar',
  ALTERAR: 'alterar',
  EXCLUIR: 'excluir',
};

export const MENSAGENS = {
  EXCLUIR_REGISTRO: 'Tem certeza que deseja remover o registro selecionado? Essa ação não pode ser desfeita. Deseja continuar?',
  REGISTRO_EXCLUIDO: 'Registro excluído com sucesso!',
  REGISTRO_CADASTRADO: 'Registro cadastrado com sucesso!',
  ERRO_OPERACAO: 'Erro ao executar a operação.',
  SAIR_TELA: 'Tem certeza que deseja sair da tela?',

  REGISTRO_CADASTRADO_SUCESSO: 'Registro cadastrado com sucesso!',
  REGISTRO_ALTERADO_SUCESSO: 'Registro alterado com sucesso!',
  REGISTRO_EXCLUIDO_SUCESSO: 'Registro excluído com sucesso!',

  PREENCHIMENTO_OBRIGATORIO: 'é de preenchimento obrigatório',
  PREENCHIMENTO_INVALIDO: 'informado é inválido',

  REGISTRO_JA_CADASTRADO: 'inserido já está cadastrado',
};

export const getCPFFormatado = (CPF = '') => {
  const FormattedCPF = CPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  return FormattedCPF;
};

export const validarCPF = (strCPF: string) => {
  let Soma;
  let Resto;
  Soma = 0;

  strCPF = strCPF.replace(/[^0-9]/g, '');
  if (strCPF == '00000000000') return false;

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

export const validarCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  //CNPJ.replace(/[^0-9]/g, ''),

  if (cnpj == '') return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(1))) return false;

  return true;
};

export const ucFirstAllWords = (str: string) => {
  const pieces = str.split(' ');
  for (let i = 0; i < pieces.length; i++) {
    const j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(' ');
};

export const getNomeFormatado = (str: string, numeros = true) => {
  const Ex = /[^a-zA-Záéíóúàèìòùâêîôûãõäëïöüç\s]/g;
  const ExNumeros = /[^a-zA-Z0-9/áéíóúàèìòùâêîôûãõäëïöüç\s]/g;
  return str.replace(numeros ? ExNumeros : Ex, '').trim();
};

export const validarEmail = (Email: string) => {
  const RegexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (RegexEmail.test(Email)) {
    return true;
  }

  return false;
};
