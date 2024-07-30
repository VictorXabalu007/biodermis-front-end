
##Portugues - BR 🟢🟡

React + TypeScript + Vite
Este modelo fornece uma configuração mínima para fazer o React funcionar com o Vite, com HMR (Hot Module Replacement) e algumas regras do ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

@vitejs/plugin-react usa Babel para Fast Refresh
@vitejs/plugin-react-swc usa SWC para Fast Refresh
Expandindo a configuração do ESLint
Se você está desenvolvendo uma aplicação para produção, recomendamos atualizar a configuração para habilitar regras de linting baseadas em tipos:

Configure a propriedade parserOptions no nível superior assim:
js

Copiar código
export default {
  // outras regras...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}

Substitua plugin:@typescript-eslint/recommended por plugin:@typescript-eslint/recommended-type-checked ou plugin:@typescript-eslint/strict-type-checked
Opcionalmente, adicione plugin:@typescript-eslint/stylistic-type-checked
Instale eslint-plugin-react e adicione plugin:react/recommended e plugin:react/jsx-runtime à lista de extends

## 📌 PONTOS IMPORTANTES

Primeiro faça clone desse repositório

após isso de um 
npm install
depois de instalar:
npm run dev 

pronto, o projeto rodará tranquilamente

## 🌿 VARIAVEIS DE AMBIENTE

O arquivo .env.example possuí informações a respeito da URL para a API.

Você primeiro deve criar 2 arquivos .env na raiz do projeto. Sendo eles .env.production ( para produção )
e .env.development ( para desenvolvimento )

A sua estrutura de arquivos deve seguir a seguinte ordem:

![image](https://github.com/user-attachments/assets/0131040b-d225-4807-9ebb-36ee5df06e19)

Dentro de .env.production, você irá inserir a URL de produção.

![image](https://github.com/user-attachments/assets/348039a3-88d9-4088-b091-0b94f4a2ca14)

Dentro de .env.development, você irá inserir a URL de desenvolvimento (sandbox).

![image](https://github.com/user-attachments/assets/2bbcfb07-f1e6-430b-864e-f3b378e6b339)

Uma vez feito isso, o projeto rodará tranquilamente para ambos o ambientes

## 📍 LOCALIZAR A URL

Um único arquivo no projeto na pasta 'service' contém o export GLOBAL da URL
que acessa a API.

![image](https://github.com/user-attachments/assets/0180613a-a957-4310-b8b3-313a79790347)

Caso você precise altera-la, é ai que deve mexer.
Lembre-se que ao usar o Vite.js, todas as variavéis de ambiente devem utilizar
o início VITE_ , para mais informações confira a documentação em:

[https://vitejs.dev/guide/env-and-mode] (https://vitejs.dev/guide/env-and-mode 📚)

## 🏗️ RODANDO O PROJETO

Se você estiver rodando o projeto em desenvolvimento, basta apenas digitar 
'npm run dev' no seu terminal.

Caso você queira rodar o projeto no ambiente de produção, deve seguir os 
seguintes passos:

Primeiro faço o build da aplicação com:

npm run build

Após a construção, você pode servir a aplicação para verificar se tudo está funcionando corretamente:

npm run serve

Feito isso, uma URL será gerada no seu terminal, então apenas copie e cole ela no
seu browser de preferencia ou de ctrl+click em cima da URL.

Feito isso, a aplicação estará rodando em produção.

##English - Version 🔴 ⚪ 🔵

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 🌿 ENVIRONMENT VARIABLES
The .env.example file contains information regarding the API URL.

You first need to create 2 .env files in the root of the project. These are .env.production (for production) and .env.development (for development).

Your file structure should follow this order:

![image](https://github.com/user-attachments/assets/0131040b-d225-4807-9ebb-36ee5df06e19)

Inside .env.production, you should insert the production URL.

![image](https://github.com/user-attachments/assets/348039a3-88d9-4088-b091-0b94f4a2ca14)

Inside .env.development, you should insert the development (sandbox) URL.

![image](https://github.com/user-attachments/assets/2bbcfb07-f1e6-430b-864e-f3b378e6b339)

Once this is done, the project will run smoothly in both environments.

## 📍 LOCATING THE URL
A single file in the 'service' folder contains the GLOBAL export of the URL that accesses the API.

![image](https://github.com/user-attachments/assets/0180613a-a957-4310-b8b3-313a79790347)

If you need to change it, this is where you should do so.
Remember that when using Vite.js, all environment variables must start with VITE_. For more information, check the documentation at:

[https://vitejs.dev/guide/env-and-mode] 
(https://vitejs.dev/guide/env-and-mode 📚)


## 🏗️ RUNNING THE PROJECT
If you are running the project in development, simply type npm run dev in your terminal.

If you want to run the project in a production environment, follow these steps:

First, build the application with:

npm run build

After the build, you can serve the application to check if everything is working correctly:

npm run serve

Once done, a URL will be generated in your terminal. Simply copy and paste it into your preferred browser or use Ctrl+Click on the URL.

This will make the application run in production.
