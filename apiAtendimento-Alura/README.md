# API REST - Agenda de PetShop
Esta API gerencia os atendimentos de um consultório.

## Módulos / Dependêcias do npm
- Express -> `npm install express`, para gerenciar o servidor na nossa máquina;


## Passos interessantes
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

3.