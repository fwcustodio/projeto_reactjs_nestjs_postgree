<h1 align="center">SIRS API</h1>

<p>SIRS - SISTEMA INTEGRADO DE REINTEGRAÇÃO SOCIAL - API</p>

<br />

# Pré-requisitos

- Node v18.20.3

# Instalação

UTILIZAR O YARN

```sh
$ yarn install
```

# Desenvolvimento

```sh
# Rodando a Aplicação
$ yarn start
```

ou o arquivo run.bat

PRIMA

npx prisma generate
yarn prisma migrate dev

Obs.: O "p" na frente de alguns itens é para tabelas relacionadas ao Perfil de Acesso

NEST

nest g resource
ou
yarn nest:create

DOCKER
Testar no docker antes de subir para os ambientes
Ter o docker instalado
docker build -t loglab/sarapi:1.0 .
