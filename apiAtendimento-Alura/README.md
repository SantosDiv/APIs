# 1. API REST - Agenda de PetShop
Esta API gerencia os atendimentos de um consultório.

## 1.1. Módulos / Dependêcias do npm
- Express -> `npm install express`, para criar o servidor na nossa máquina;
- Nodemon -> `npm install nodemon`, para que o nosso servidor atualize automaticamente;
- Consign -> `npm install consign`, para gerenciar as rotas;
- Body-Parser -> `npm install body-parser`, para fazer com que o nosso servidor entenda os dados enviados pelo body (client). Ex.: urlEncoder, json...
- Mysql -> `npm install mysql`
- Moment -> `npm install moment`


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


## 3.2. Configurando a conexão no projeto
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
## 3.3. Conectando e utilizando essa conexão que criamos
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

## 3.4. Criando as Tabelas
Está ficando lindo. Agora precisamos criar as nossas tabelas, e a melhor forma de fazer isso é criando um script, pois assim nos dá uma automatização da nossa API, pois caso outra pessoa precise usar ela, editar, não será preciso criar 'na mão' e assim evitando erros humanos. Então caso essa tabela não exista, nós iremos pedir para que crie.

1. Dentro da pasta Infraestrutura crie um arquivo chamado `tabelas.js`;
2. No arquivo tabelas, cós vamos criar uma class chamada `Tabelas`, e é nelas que vamos fazer a criação da nossa tabela. Veja:
```js
    class Tabelas {
        init(conexao) { // O init é um método que está sendo chamado lá no index.js que por sua vez, chama o criarAtendimentos();
            this.conexao = conexao;
            this.criarAtendimentos();
        }
        // O IF NOT EXISTS serve para que só crie a tabela, caso ela não exista ainda. Assim quando iniciarmos o servidor, ele não vai ficar tentando criar a mesma tabela e não vai dá erros.
        criarAtendimentos() {
            const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
            this.conexao.query(sql, (erro) => {
                if(erro) {
                    console.log(erro);
                } else {
                    console.log('Tabela atendimentos criada com sucesso')
                }
            });
        }
    }

    module.exports = new Tabelas;
```
3. Verifique no Workbanch a tabela criada.

## 3.5. Adicionando dados na tabela
Com a tabela criada, vamos adcionar agora os dados enviados pelo nosso cliente, dentro desta tabela. Para isso vamos fazer o seguinte:
1. Crie uma pasta chamada `models`;
2. Dentro da pasta, crie um arquivo chamado `ModelAtendimento`. Neste arquivo, nós iremos criar a lógia de inserir os dados na tabela.
3. Faça o requerimento do arquivo de conexão com o DB;
4. Agora crie uma classe chamada `Atendimento`;
5. Dentro da classe, você vai criar um método chamado `adciona()`, vai ficar assim:
   ```js
    const conexao = require('pasta_do_arquivo/arquivo');

    class Atendimento {
        adiciona(atendimento) {
         const sql = 'INSERT INTO nome_da_tabela SET ?';
         conexao.query(sql, atendimento, (error, resultados) => {
             if (error) {
                 console.log(error);
             } else {
                 console.log(resultados);
             }
         });
        }
    }

    module.exports = new Atendimento;
   ```
   6. Agora basta ir no arquivo `atendimento.js` e configurar para que, os dados que são enviados pelo nosso cliente, sejam enviados para dentro deste nosso módulo `Atendimento` que acabamos de criar. Veja:
   ```js
    const Atendimento = require('./models/modelAtendimento');
    module.exports = app => {
        // ..Códigos de get.. //

        // Post
        app.post('/atendimentos', (req, res) => {
            Atendimento.adciona(req.body);
            res.send('Você está na rota atendimentos e fazendo um POST');
        });
    }
   ```
   Tudo certo 👍! Agora você pode ir conferir lá no Workbanch se os dados foram inseridos na sua tabela. (Depois de você ter enviado pelo Postman);

   ## 3.6. Configurando e enviando Datas
   É certo que como nossa API é de agendamento, precisamos de datas. Saber o dia que vai ser o atendimento e quando foi solicitado. Pois bem, para isso precisamos configurar o formato que essas datas serão enviadas para o nosso DB, pois o formato padrão nele é YYYY-MM-DD. Que é o contrário no nosso querio 🇧🇷.

   Para isso, primeiro vamos adicionar estes campos na nossa tabela, já que ainda não existem.
   1. Vá no arquivo de `tabelas.js`;
   2. E atualize o `CRATE TABLE` adicionando os seguintes campos:
   ```js
        const sql = 'CREATE TABLE IF NOT EXISTS nome_da_tabela (... data datetime NOT NULL, dataCriacao datetime NOT NULL')
        // Veja que eu adcionei ao final da tabela os campos data e o dataCriacao, que não os novos campos da nossa tabela.
   ```
   3. Após feito isso, salve e vá ao workbanch;
   4. Apague a tabela antiga (Clique com o botão direito em cima dela e dê um `DROP TABLE`). Você pode usar o `ALTER TABLE`, É MAIS SEGURO! Contudo tive uns erros e tive que partir para medidas drásticas para adicionar estes campos datas.
   5. Após apagar a tabela, vá no arquivo `tabelas.js` e salve novamente. Assim ele vai criar a nova tabela com os novos campos que acabamos de adcionar;
   6. Com os campos criados, vamos configurar o formato da data para cadastrar no bando de dados, antes de enviar para ele. Para isso faça: No arquivo  `modelAtendimento.js`
   ```js
   // Importe a lib moment() que instalamos
    const moment = require('moment');

    class Atendimento {
        adciona(atendimento) {
        const dataCriacao = new Date();
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS');

        const atendimentoDatado = {...atendimento, dataCriacao, data};

        const sql = 'INSERT INTO Atendimentos SET ?';
        conexao.query(sql, atendimentoDatado, (error, resposta) => {
            if(error) {
                console.log(error);
            } else {
                console.log(resposta);
            }
        })
        }
    }
   ```

   Prontinho 😄. Agora, é só ir no Postman e enviar uma data para o atendimento, e ela será salva no seu DB no formato correto e também será salva a data atual, ou seja o momento em que foi feito o pedido.

   # 4. Configurando a reposta do servidor
   Todas as vezes que nós fazermos uma requisição ao nosso servidor, ele nos retorna um status de sucesso ou de erro. Quando ele retorna um status `200` significa que deu certo, a requisição foi feita com sucesso. Quando ele retorna com `400` significa que teve um erro no client, ou seja, fizemos uma requisição que não era possível e assim ele deu esse erro.
   Tudo que é 2xx é sucesso, e tudo que é 4xx é erro no client.

   Assim, vamos configurar para que quando o nosso cliente fizer uma requisição válida ele nos retorne o sucesso e o contrário retorne uma falha.

   1. Vá no arquivo `atendimento.js` da pasta controllers;
   2. No post, nós estávamos apenas dando um send com a `res`. Vamos enviar essa res para frente. dessa forma:
   ```js
   app.post('/atendimentos', (req, res) => {
       const atendimento = req.body;
       Atendimento.adciona(atendimento, res); // Estamos passando essa res para o nosso módulo atendimento.
   })
   ```
   3. No módulo `Atendimento`, faça o seguinte:
    ```js
    class Atendimento {
        adiciona(atendimento, res) {
            //... Código que não mexemos

            // Código alterado
            conexao.query(sql, atendimentoDatado, (error, resultado) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    // Status 201 é de CREATED, ou seja foi criado com sucesso. Faz mais sentido.
                    res.status(201).json(resultado);
                }
            });
        }
    }
    ```
# 5. Tratando erros
É importante tratar erros no lado do servidor, pois assim garantimos que não será enviado ou cadastrado nada errado no nosso DB. Impedindo assim que a nossa API quebre. De cara temos duas regras de negócios bem visíveis que precisamos colocar na nossa aplicação: O cliente não pode cadastrar uma data anterior da data atual e o nome dele precisa ter pelo menos 5 caracteres.
Vamos fazer isso?
1. Vá no módulo `Atendimento` e faça o seguinte.
```js
    const dataCriacao = new Date();
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    // Adicione
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao); // Aqui eu uso um método do moment que me retorna um TRUE ou FALSE se a data digitada for depois da data de Criação.

    const nomeEhValido = atendimento.client.length >= 5;

    const validacoes = [
        {
            nome: 'cliente',
            valido: nomeEhValido,
            mensagem: 'O nome não pode ter menos que cinco caracteres',
        },
        {
            nome: 'data',
            valido: dataEhValida,
            mensagem: 'A data não pode ser antes da data atual',
        },
    ];

    const erros = validacoes.filter(campo => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
        res.status(400).json(erros);
    } else {
        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        const sql = 'INSERT INTO Atendimentos SET ?';
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json(resultados)
            }
        });
    }
```
Observe que agora foi criado um array de objetos com os erros possíveis que mensionamos ateriormente. Fizemos um filtro, se caso a chave `valido` seja Falsa, a constante erros vai ter um elemento e logo vai entrar na condição.

O cadastro no banco só acontece quando tudo ocorre bem, se tiver algum erro não entra no cadastro.

# 6. Listando os dados do nosso DB
Nós cadastramos os dados, mas precisamos responder esses dados cadastrados para o nosso cliente, caso ele solicite. E vamos fazer isso utilizando o `GET`. Ou seja, ele vai fazer uma requisição por meio de um GET e nós vamos mostrar para ele somente a resposta dessa requisição.

1. Vá no arquivo de rotas (O controlles `atendimento.js`) e nela vamos editar o get da rota atendimento;
2. ```js
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });
    ```
3. Você deve ter percebido que tem um método `lista` no módulo Atendimento que não havíamos falado antes. E de fato não falamos mesmo, ele ainda não existe. Vamos criar agora.
4. Vá no arquivo `modelAtendimento.js` e coloque esse método:
   ```js
   lista(res) {
       const sql = 'SELECT * FROM Atendimentos';
       conexao.query(sql, (erro, resultado) => {
           if(erro) {
               res.status(400).json(erro);
           } else {
               res.status(200).json(resultado);
           }
       })
   }
   ```
Prontinho, agora quando solicitarmos via a URL, a rota `/atendimentos`, vai nos dá uma resposta de todos os itens salvos na nossa tabela. Em formato JSON.

## 6.1. Mais um GET
E se quisermos pegar apenas um cliente? Pelo id dele? Como faremos? Vamos lá!
1. Vá no arquivo `atendimentos.js` em controllers e adicione mais um get. Assim:
   ```js
   app.get('/atendimentos/:id', (req, res) => {
       const id = parseInt(req.params.id);
       Atendimento.buscaPorId(id, res);
   });
   ```
   Veja a pequena diferença no caminho da rota. Nós colocamos um `/:id`, ou seja, depois do dois ponto ele pode receber alguma coisa que não sabemos ainda, mas que será digitado pelo cliente. Ainda colocamos um parâmetro de requisição id, para pegar o id. Só transformamos ele em Inteiro, pois no nosso DB está em inteiro.
2. Vá no `modelAtendiento`, e crie o método `buscaPorId`
   ```js
   buscaPorId(id, res) {
       const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
       conexao.query(sql, (erro, resultado) => {
           const atendimento = resultado[0]; //Por que a resposta é um array de um único objeto. Ai estamos pegando só o objeto.
           if (erro) {
               res.status(400).json(erro);
           } else {
               res.status(200).json(atendimento);
           }
       })
   }
   ```
Pronto 😊!

# 7. Atualizando dados da nossa tabela
Caso seja necessário atualizar algum dado da nossa tabela, nós iremos utilizar o Método HTTP `PATCH`. Poderíamos atualizar com o `PUT`, mas para ser mais semântico, no padrão REST, vamos utilizar o `PATCH`.

Para isso vamos fazer o seguinte
1. Vá no arquivo de rotas, no controllers (`atendimento.js`);
2. Nele você vai criar uma nova rota, com o patch.
   ```js
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimento.altera(id, valore, res);
    })
   ```
3. No módulo `Atendimento`, você vai criar o método `altera()`;
   ```js
    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';
        conexao.query(sql, [valores, id], (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }
   ```
# 8. Deletando dados da tabela
Por fim, vamos adicionar a funcionalidade de deletar dados da nossa tabela. Para isso nós vamos utilizar o método HTTP `DELETE`.
Vamos lá:
1. Vá no arquivo de rotas (Controllers/atendimento.js) e crie uma rota do tipo DELETE.
   ```js
   app.delete('/atendiemento/:id', (req, res) => {
       const id = parseInt(req.params.id);
       Atendimento.deleta(id, res);
   })
   ```
2. Agora vá no módulo Atendimento e faça adicione o método `deleta`:
   ```js
    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        conexao.query(sql, id, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id });
            }
        })
    }
   ```
   Tudo certo! Agora a nossa API está trabalhando com GET, POST, PATCH e DELETE 🎊;

   # Ultimos ajustes
   Só para deixar uma reposta mais amigável para o nosso usuário, quando ele faz um puss ou uma atualização, podemos, em vez de retornar uma resposta padrão do mysql, retornar o elemento que foi alterado ou adicionado.
   Basta ir nos respectivos métodos e fazer essa alteração de resposta. No arquivo está alterado dessa maneira, caso queria ver.

