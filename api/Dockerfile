FROM node:18-alpine AS builder

ARG URL_BANCO
ARG KEYCLOAK_PUBLIC_KEY

ENV URL_BANCO=$URL_BANCO
ENV KEYCLOAK_PUBLIC_KEY=$KEYCLOAK_PUBLIC_KEY

WORKDIR /app
COPY . .

COPY .yarn_cache /usr/local/share/.cache/yarn/v6

RUN yarn install --frozen-lockfile

#ajusta a permissao de acesso da pasta do prisma
#RUN [ -d "node_modules/.prisma" ] && chmod 777 -R -f "node_modules/.prisma" 

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]