# 💾 Backend

Este projeto usa o ambiente de reprodução do `node` e a framework `express`.

### 🚀 Instalar

Depois de clonar o projeto correr o comando `yarn install`.
Depois é necessário fazer o pull do `.env` a partir do _dotenv vault_ usando o ficheiro `.env.vault` da root do projeto e fazendo o `login` em vault.dotenv.org

Inicialmente, usamos o seguinte comando:

```bash
npx dotenv-vault@latest pull
```

Depois disto basta seguir as intruções na linha de comandos.
Quando o download do ficheiro `.env` for devidamente feito, corremos o comando `yarn dev` para iniciar o servidor local.

### 📚 Stack

##### Dev

- Node 🧠
- Express 🚀
- Typescript 💪🏼
- JWT 🔒

##### CI/CD

- Husky 🐶
- Eslint 📏
- Prettier 💁🏼‍♀️
- Commitlint ✅

##### Base de dados

- Postgres 🐘

##### Documentação

- Swagger 🕶️
