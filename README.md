
##Portugues - BR

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

##PONTOS IMPORTANTES

O arquivo .env.example possuí informações a respeito da URL para a API.

Você primeiro deve criar um arquivo .env na raiz do projeto, e copiar o nome da variavél já escrita em .env.example

![image](https://github.com/user-attachments/assets/6030e4b1-21de-4487-9e58-c5ab8a8a9bfd)

Dentro dele, você deve inserir a URL para acessar a API

![image](https://github.com/user-attachments/assets/9cb7938b-eb07-457b-b93d-208aa0f2551d)

Uma vez feito isso, o projeto rodará tranquilamente


##English - Version

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

##IMPORTANT POINTS

The file .env.example localized in the project root, contains informations regarding the URL for the API.

You should first create a .env file in the root of the project and copy the variable names already written in .env.example.

![image](https://github.com/user-attachments/assets/6030e4b1-21de-4487-9e58-c5ab8a8a9bfd)

Inside it, you need to enter the API URL to make the connection

![image](https://github.com/user-attachments/assets/9cb7938b-eb07-457b-b93d-208aa0f2551d)

Once this is done, the project will run smoothly.

