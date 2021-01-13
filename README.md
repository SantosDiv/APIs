# Repositório contendo APIs criadas
Este repositório serve apenas para conter algumas APIs criadas em cursos ou de forma própria. Com o intuito de alocar também algumas instruções de como instalar e quais as tecnologias/módulos foram usados para a realização do mesmo.

## Intalação do NodeJs - Windows
Para utilizarmos o nodeJs precisamos instala-lo em nossa máquina. Se você usa o **Windows**, você pode acessar o próprio site do Node Js [Aqui](https://nodejs.org/en/) e instalar a versão **LTS**. Que é a mais estável até o momento. Seguir os passos de instalação e tudo certo. Ele já vem com o npm instalado, normalmente.

## Instalaçao do NodeJs - Linux
Para instalar no Linux Ubunto 20.04 podemos seguir três caminhos diferentes. Veja:

### Forma 1 - Instalando via o apt e dos padrões do Ubunto
Por padrão o node está contido no repositório do proprio Ubunto para oferecer uma experiência mais consistente. E você pode baixar pelo apt seguindo esses passsos.

**Atualize o apt.**
```sh
  $ sudo apt update
```

**Instale o node**
```sh
  $ sudo apt install nodejs
```

**Instalando o npm**
```sh
  $ sudo apt install npm
```

**Verificando as instalações**
```sh
  $ nodejs -v ## Deve retornar a versão
  $ npm -v ## Deve retornar a versão
```

### Forma 2 - Instalando com uma versão a sua escolha. Via o PPA
Para instalar uma versão diferente da do repositório do Ubunto, nós usamos o NodeSource PPA, que é um pacote pessoal. Temos uns passos diferente para isso:

 - **Instale o PPA**
Instale o PPA com a versão que você deseja do node. Exemplo que ta aqui **14.x**. (o x é indicando que pode pegar a última subvariação do node versão 14).
```sh
  $ cd ~
  $ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
```

- **Verifique o Script** - Verifique se ta tudo certo com o script (Se é como deseja);
```sh
  $ nano nodesource_setup.sh
```

- **Execute o script acima**
```sh
  $ sudo bash nodesource_setup.sh
```
Dessa forma o PPA vai ser adcionado ao seu cache de pacotes local e será atualizado automaticamente. Agora basta instalar o node como mostrado na **Forma 1**. *Com a ressalva que não é preciso instalar o npm quando se instala dessa forma.*

**Verificando as instalações**
```sh
  $ nodejs -v ## Deve retornar a versão
  $ npm -v ## Deve retornar a versão
```

Todos esses passos foi retirado do Site [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt). Veja para ver com mais detalhes.