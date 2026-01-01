![ueno bank](https://www.ueno.com.py/documents/20123/45790/Logo_ueno_bank_verde.png/89024a4c-859a-4e84-c479-7616f3e95108?t=1703072773637)

<h1 style="text-align: center">Ueno Backend for Frontend Template (BFF)</h1>

## Scanned on Sonar

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=ueno-tecnologia-org_loans-backoffice-bff)

## ¿What is Ueno BFF Template?

Is the official template for BFF solutions. Is Based on [Fastify](https://fastify.dev/) and [Typescript](https://www.typescriptlang.org/)

## Motivation

Our motivation is to provide development teams with solid tools and an architecture to build **high-speed solutions** without worrying about scaffolding, tooling, continuous integration and continuous deployment.

## Community

Made by platform team :heart: for the community

## Content Table:

- [Start](#start)
- [Tips and Suggestions](#tips-and-suggestions)
- [Swagger Documentation](#swagger-documentation)
- [RECOMMENDATION](#RECOMMENDATION)
- [CI-CD](#CI-CD)

## Start

#### Pre-Requirements 🚀

1- Install Node Version Manager [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)

brew installation

```
/bin/bash -c "$(curl -fsSL https:/raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew uninstall --ignore-dependencies node
brew uninstall --force node

brew update
brew install nvm
```

curl installation

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

```

Follow the installations steps of the nvm official site.

2- Install [Yarn](https://classic.yarnpkg.com/en/) Globally

```
sudo npm install -g yarn
```

#### Clone repository ⬇️

```
git clone git@bitbucket.org:gvcorppy/node_fastify_template.git
```

#### Install dependencies 🔧

`yarn install`

#### Build application 🧱

`yarn build`

#### Run Application as Dev 🧱

`yarn dev`

#### Run Tests 👍

`yarn test`

#### Another commands:

`yarn lint`

`yarn prettier`

## Tips and Suggestions

The Node Version Manager will help you organize your Node versions. Here we leave some links to install it and how to use it.

- NVM (para <a href="https://github.com/coreybutler/nvm-windows" target="_blank" >Windows</a>, para <a href="https://github.com/nvm-sh/nvm" target="_blank" >Unix</a>).

Tener instalado globalmente:

- <a href="https://eslint.org/docs/user-guide/getting-started" target="_blank" >ESLint</a>

## Swagger Documentation

Locally when your run the app with `yarn dev`

```
http://0.0.0.0:8080/private/swagger-docs
```

In the servers:

```
http://{doamin-enviroment}/private/swagger-docs
```

## RECOMMENDATION

To understand how it works in **Typescript** read the following [documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html) and to understand how **React works with Typescript** \* \*WE RECOMMEND\*\* this [link](https://react-typescript-cheatsheet.netlify.app/)

## CI-CD

WIP (Coming Soon)

## Redis

docker run -it -p 6379:6379 redis

## Env variables

REDIS_URL=redis://127.0.0.1:6379
ENABLED_PINO_PRETTY=disabled
ENABLED_REQ_RES_LOG=false

## estructura de carpetas

Se deja propuesta de carpetas en src/modules retomando la propuesta original del template de BFF para mejorar la organización del bff.

## about tsconfig.json

There are several changes made to the `tsconfig.json` compared with the original template:

- Deleted `tsconfig.build.json`:
  Originally, `tsconfig.build.json` was meant to extend the original `tsconfig.json` and exclude unnecessary files like test files or comments, but there is no straightforward way to exclude files from TypeScript compilation. There are inconsistencies when trying to make exclusions in the `tsconfig.json`. Bundlers are better suited to do this kind of task, but this is out of the scope of the current task.

- Set `"rootDir": "./src"`:
  All the TypeScript files must be included in the `src` folder because this will be the build root. This helps maintain a clear boundary between local files and production ones. The most important reason is that by doing this, we can maintain the same folder structure both locally and in elevated environments, improving the reliability of local tests. For example, running `yarn build` and `yarn start` yields the same result as running the project with Docker.

- Removed `baseUrl` from `tsconfig.json`:
  This feature was designed for use in conjunction with AMD module loaders in the browser and is not recommended in any other context. As of TypeScript 4.1, `baseUrl` is no longer required to be set when using paths. See https://www.typescriptlang.org/tsconfig/#baseUrl. Originally, this was used to use relative paths instead of absolute ones, but if it's not a required property, it's better to remove it and avoid confusion.

- Add `compilerOptions.paths`:
  This property is initially configured to define convenient path aliases but has other uses worth exploring.
  https://www.typescriptlang.org/docs/handbook/modules/reference.html#paths
  https://www.typescriptlang.org/tsconfig/#paths
  Example:

  This import

  ```ts
  import { RequestDetailDto } from '../../../modules/requests/dtos/RequestDetail.dto';
  ```

  is replaced for this:

  ```ts
  import { RequestDetailDto } from '~/modules/requests/dtos/RequestDetail.dto';
  ```

  with this configuration:

  ```ts
    "paths": {
      "~/*": ["./src/*"],
    },
  ```
