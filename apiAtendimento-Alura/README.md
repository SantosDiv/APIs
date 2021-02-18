# 1. API REST - Agenda de PetShop
Esta API gerencia os atendimentos de um consultório.

## 1.1. Módulos / Dependêcias do npm
- Express -> `npm install express`, para criar o servidor na nossa máquina;
- Nodemon -> `npm install nodemon`, para que o nosso servidor atualize automaticamente;
- Consign -> `npm install consign`, para gerenciar as rotas;
- Body-Parser -> `npm install body-parser`, para fazer com que o nosso servidor entenda os dados enviados pelo body (client). Ex.: urlEncoder, json...
- Mysql -> `npm install mysql`


## 1.2. Criando a primeira rota
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
O `get` vai me possibilitar enviar dados por minha rota `/` criar uma rota. Estou dando um `get` na rota **'/'**. Ou seja, na minha root. Essa função get me dá duas coisas. A primeira é o `req = Require`, ou seja aquilo que eu solicito ao meu servidor. E o parâmetro `res = Response`, que aquilo que o meu servidor me responde, me dá como retorno.
Neste nosso caso ai, estou dando um `res.send()` com a mensagem: "Servidor rodando. Tudo ok!". Quando eu iniciar o meu servidor novamente, a minha página vai mostrar essa mensagem.

3. Para não ficar derrubando e iniciando o nosso servidor em toda a atualização dos nossos arquivos. Podemos utilizar uma dependência do node chamada de `Nodemon`. Ela nos dá a possibibilidade de automaticamente o nosso servidor ficar sendo atualizado na medidada em que salvamos os nossos arquivos. Sem a necessidade de iniciar o servidor novamente. Para isso, vá no arquivo **package.json** e na propriedade `scripts`, coloque uma propriedade no dentro dele chamada `start: 'nodemon index.js',`. Assim quando iniarmos o nosso servidor com `npm start`, ele já vair ficar sendo atualizado automaticamente.
```js
    // no arquivo package.json
    scritps: {
        'start': 'nodemon index.js', // Linha adcionada
        "test": "echo \"Error: no test specified\" && exit 1"
    }
```

## 1.3. Organizando os nossos arquivos
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

 ## 1.4. Enviando dados
 Para enviar os dados utilizamos o POST. Como a nossa API não é somente para Browsers, precisamos envivar usando uma linguagem que outros serviços entendam. Não só os dados que são enviados pelos formuçários que conhecemos.

 Para fazer esses serviços de testes de envio POST, estou utilizando o Postman.

 1. No nosso arquivo **atendimentos.js**, onde está os nossos controles de envio e recibimento de dados das nossas rotas, na função `app.post()`, criar uma requisição, como se o meu cliente estivesse passando para mim, algum dado.
 ```js
    app.post((req, res) => {
        console.log(req.body); // Estou pegando o reqeuerimento do cliente. Como se ele estivesse mandando os dados do formulário para o meu servidor.

        res.send('Você está na rota atendimento fazendo um POST');
    });
 ```

2. No meu arquivo `customExpress`, eu vou só precisar configurar o meu servidor para entender esses dados que o meu cliente está requisitando para mim. Para isso, eu vou utilizar um módulo do node chamado `body-parser`, que faz esse *parse* para mim, e assim o meu servidor entende o dado enviado. O `urlencoded` são os dados envidados por fomulários, mas como a nossa API não é somente para os browsers, estamos usando o body-parser para os dados em JSON. Assim o nosso servidor consegue administrar/entender os dois tipos de dados.

```js
    const bodyParser = require('body-parser');
    const app = express();

    app.use(bodyParser.urlencoded({extended: true})); // Aqui ele faz o servidor entender os dados enviados pelos fomulários comuns.
    app.use(bodyParser.json()); // Aqui to dizendo para o meu servidor entender os dados em JSON
```

3. Com os meus arquivos configurados para receber as requisições do meu client, eu vou no **Postman** e faço essas requisições. Primeiro, posso testar com o urlenconder, passando apenas as chaves e valor do nosso formulário. Nós temos só que configurar o nosso `Content-Type` para o form-urlenconded que é basicamente um formulário sendo preenchido e enviando para o servidor. (Está na aba Headers e o Body na aba Body, onde podemos colocar a chave e o valor do nosso form). Por exemplo: Se na key = Nome e o Value = Diogenes, vou ter algo semelhante no console:
```js
    { Nome: 'Diogenes' }
```

Mas como vimos, configuramos também para receber dados JSON, simples. Basta alterar o nosso `content-type` para `json` e o envio ser no `row` na aba Body. Exemplo: {nome: 'Diogenes'}, vou ter a seguinte saída:
```js
    { nome: 'Diogenes' }
```

# 2. Persistindo Dados
Para persistir os dados, ou seja, salvar eles em um banco de dados, nós vamos utilizar o MySQL e o WorkBanch (para ter uma visualização gráfica melhor).

## 2.1. Primeiro passo - Instalando o Mysql
Nós precisaremos instalar tanto no nosso computador, quanto no nosso projeto a dependência mysql no node.

### 2.1.1. Instalando localmente
Primeiro vamos instalar na nossa máquina o mysql-server.
   ```sh
    # Primeiro Atualize o apt
    sudo apt update

    # Segundo instale o mysql
    sudo apt install mysql-server
```
### 2.1.2. Testando a instalação
Agora basta testarmos a instalação, vermos se o nosso servidor está rodando, ou ativo. Para isso digite no seu terminal:
```sh
# Verifica o status
sudo systemctl status mysql

# Resposta esperada:
mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; disabled; vendor preset>
     Active: active (running) since Thu 2021-02-18 13:37:44 -03; 33min ago
    Process: 17533 ExecStartPre=/usr/share/mysql/mysql-systemd-start pre (code=>
   Main PID: 17543 (mysqld)
     Status: "Server is operational"
      Tasks: 39 (limit: 9351)
     Memory: 412.1M
     CGroup: /system.slice/mysql.service
             └─17543 /usr/sbin/mysqld

fev 18 13:37:38 diogenessantos systemd[1]: Starting MySQL Community Server...
fev 18 13:37:44 diogenessantos systemd[1]: Started MySQL Community Server.
lines 1-13/13 (END)

```
Note que o status **Active:  active (running)** apareceu. Logo, tudo está rodando e foi instalado com sucesso.

Mas você está se perguntando: Então eu instalei e já foi iniciado automaticamente o mysql para mim? Eu te respondo, sim! Mas você pode querer ter o controle disso, ou seja desabilitar e habilitar o mysql quando desejar, para economizar memória. Pois, caso contrário, ele irá iniciar junto com o seu computador. E talvez você deseje economizar um pouco de memória RAM não é mesmo?

Pois bem, para isso façamos:
```sh
# Aqui irá desabilitar o seu mysql para não inicar com o computador
sudo sytemctl desable mysql
```

Logo, se desabilitamos o início automático, será necessário dar um 'start' nele, quando iniciarmo o computador, para podermos utilizar os seus serviços, concorda? Logo faça:
```sh
# Aqui inicia o servidor na nossa máquina
sudo systemctl start mysql

# Veja se ta rodando
sudo systemctl status mysql
```
Perfeito! 🤓

Agora que tudo está instalado, e que está inciando quando queremos, vamos colocar uma senha para o nosso servidor mysql. Com ela, nos dá mais segurança e precisaremos dela para o uso do Workbanch.

### 2.1.3. Configurando uma senha
Para colocar uma senha, no seu terminal digite
```sh
sudo -u root -p
```
É provável que não peça senha (Como você ainda não tem), a não ser a do seu super usuário (da sua máquina). Pois a senha do MySQL é diferente da sua senha do computador ta bom? 😄

Após você digitar a sua senha de super usuário, você vai entar em uma tela semelhante a isso:
```sh
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.23-0ubuntu0.20.04.1 (Ubuntu)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```
Isso mostra que entramos no mysql, pelo terminal! Parabéns 😄. Agora onde o cursor está piscando, você vai digitar o seguinte comando:
```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha_aqui'; flush privileges;
```
⚠️ Atenção! Onde está escrito **sua_senha_aqui**, você vai digitar a senha de sua preferência. É importante você anotar em algum lugar para quando precise utilizar ela. Depois disso é só dar um ENTER e prontinho. Seu servidor está configurado. Seu usuário é o **root** e sua senha é essa que você colocou agora. :)

## 2.2. Segundo Passo - Instalando o WorkBanch
Agora que o nosso Mysql está instalado e configurado, vamos instalar o workbanch, que nada mais é que uma ferramenta para visualizarmos melhor as nossas tabelas e os nossos banco de dados. É algo mais visual.

### 2.2.1. Instalando - Linux ubunto 20.04
1. Abra o [Link](https://downloads.mysql.com/archives/workbench) para baixar o arquivo.
2. Escolha a versão do seu linux e faça o download; (Não precisa de login, você pode clicar na opção 'No thanks, just start my download').
3. No terminal inicalize o instalador que você baixou:
   ```sh
    sudo apt install ./nome-do-arquivo
   ```
   Atenção ao caminho da pasta, você precisa entrar onde o arquivo está e então executar esse comando acima.
4. Abra o programa (Depois de instalar);
5. Clique na conecção que está aparecendo, neste caso o localhost, e coloque a senha do Mysql que você configurou ateriormente. Depois clique em `Save password`, para deixar salva :)

Prontinho, tudo certo e agora é só começar a usar 🚀

# 3. Usando o Mysql
Agora que está tudo instalado, nós vamos utilizar o mysql no nosso projeto de API de agenda de petshop.

Primeiro, no workbanch vamos criar uma nova conexão com o nome de `agenda_petshop`. Nela vamos entrar e criar um novo `Schemas`, que é onde fica os nossos banco de dados.

Resumindo vamos criar um banco de Dados novo, com o nome de `agenda-petshop`.

## 3.1. Instalando a dependência do Mysql
Para podermos utilizar no nosso projeto, o node precisa da dependência do msyql, assim, instale com o comando:
`npm install mysql`.


## Configurando a conexão no projeto
Nós instalamos a dependência, agora precisamos criar a conexão com o nosso banco de dados, que criamos no Workbanch.
1. Crie uma pasta chamada `infraestrutura`;
2. Dentro dela crie um arquivo chamado `conexao.js`;
3. No arquivo, primeiro importe o mysql com `const mysql = require('mysql');`;
4. Crie uam variável chamada `conexao` e nela coloque o que tem no próximo passo;
5. Agora com o mysql importando, podemos criar a nossa conexão com o a função createConnection do próprio mysql. Ela recebe como parâmetro um objeto, que por sua vez são as informações do nosso banco de dados criado. Veja:
   ```js
    const conexao = mysql.createConnection({
        host: 'localhost',
        port: '3306', // essa porta aqui é a que veio padrão do MySQL, vocẽ pode verificar ela, no seu workbanch;
        user: 'root',
        password: 'a_senha_que_você_escolheu',
        database: 'agenda-petshop' // nome do banco de dados que criamos no workbanch
    });
   ```
6. Por fim, dê um `module.exports = conexao;`;

O arquivo conexao.js fica assim:
```js
    const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'a_senha_que_você_escolheu',
    database: 'agenda-petshop',
});

module.exports = conexao;
```
## Utilizando essa conexão
Agora que criamos, precisamos utilizar ela. Nós vamos chamar essa conexão no nosso arquivo `index.js`, o arquivo principal.

1. Importe a conexao, do arquivo `conexao.js` com: `const conexao = require('./infraestrutura/conexao)`;
2. Conecte usando o método `conect()`, dessa forma: `conexao.connect()`;
3. Como precisamos saber se a conexão foi um sucesso ou não, vamos adicionar uma função dentro do connect, dessa forma:
```js
    conexao.connect(error => {
        if(error) {
            console.log(error);
        } else {
            console.log('Conectado com sucesso');
            // Coloque aqui também todo o nosso servidor, e a inicialização do nosso app. Pois queremos que as coisas funcionem apenas quando o nosso banco de dados também estiver funcionando.

            const app = customExpress();
            app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
        }
    });
```

Assim, quando rodarmos, vamos ver uma mensagem de log, com o sucesso, ou um erro. Se caso for sucesso, ela virá antes do servidor rodando.