# API REST - Agenda de PetShop
Esta API gerencia os atendimentos de um consultório.

## Módulos / Dependêcias do npm
- Express -> `npm install express`, para gerenciar o servidor na nossa máquina;


## Criando a primeira rota
1. Com o express instalado, é necessário iniciar o nosso servidor. Para isso, utilizamos:
```js
    const express = require('express'); // Importando o pacote do servidor com o require
    const app = express(); // Excutando a função e guardando o nosso serviodor na constante app
    app.listen(3000, () => console.log('Servidor rodando na porta 3000')); // na porta 3000 eu coloco um escutador (listen);
```

2. Como visto acima, não tenho nenhuma rota criada no meu servidor. Assim preciso criar uma rota para ele.
```js
    app.get('/', (req, res) => res.send('Servidor rodando. Tudo ok!'));
```
O `get` vai me possibilitar criar uma rota. Estou dando um `get` na rota **'/'**. Ou seja, no minha root. Essa função get me dá duas coisas. A primeira é o `req = Require`, ou seja aquilo que eu solicito ao meu servidor. E o parâmetro `res = Response`, que aquilo que o meu servidor me responde, me dá como retorno.
Neste nosso caso ai, estou dando um `res.send()` com a mensagem: "Servidor rodando. Tudo ok!". Quando eu iniciar o meu servidor novamente, a minha página vai mostrar essa mensagem.

3. Para não ficar derrubando e iniciando o nosso servidor em toda a atualização dos nossos arquivos. Podemos utilizar uma dependência do node chamada de `Nodemon`. Ela nos dá a possibibilidade de automaticamente o nosso servidor ficar sendo atualizado na medidada em que salvamos os nossos arquivos. Sem a necessidade de iniciar o servidor novamente. Para isso, vá no arquivo **package.json** e na propriedade `scripts`, coloque uma propriedade no dentro dele chamada `start: 'nodemon index.js',`. Assim quando iniarmos o nosso servidor com `npm start`, ele já vair ficar sendo atualizado automaticamente.
```js
    // no arquivo package.json
    scritps: {
        'start': 'nodemon index.js', // Linha adcionada
        "test": "echo \"Error: no test specified\" && exit 1"
    }
```

## Organizando os nossos arquivos
 - Criar uma pasta chamada `controllers`;
 - Colocar nela todos os gets (rotas). Coloquei um aquivo chamado atendimento, que se refere a rota atendimento.
 - No arquivo atendimento, eu coloque o `module.exports = app => {app.get((req,res)=>res.send())}`;
 - Consign - Instalar (npm install consign);
 - O consign vai me possibilitar gerenciar essas rotas nos meus arquivos que eu precisar delas.
 - No aruivo `index.js` eu requeri o consign `const consign = require('consign')`;
 - Depois eu executei a função e dei um include da pasta `controllers` que tem dentro dela o módulo `app`;
 ```js
    const express = require('express');
    const consign = require('consign');

    const app = express();
    consign()
        .includes('controllers')
        .into(app)
    // Assim o meu servido vai entender que você ta chamando uma rota, criada em outro arquivo. Por que você ta importando com o consign.
 ```
 - Criar um pasta chamada config e nela colocar tudo que é referente ao nosso servidor e gerenciamento, incluindo o consign;
 - Nela levar tudo que foi escrito mais acima para um arquivo chamado `customExpress.js`. Pois ele será responsável por guardar as customizações do nosso servidor;
 - Ai preciso só dar um `module.exports = () => {todo o código copiado anteriormente e retornar o app}`;
 - No arquivo index, eu vou pegar o módulo que ta sendo exportado para poder usar na variável  `app`
 ```js
    const customExpress = require('./config/customExpress');
    const app = customExpress();
    app.listen('/atendimento', (req, res) => res.send('Estou na rota de antendiemento.'))
 ```