<h1 align="center"> 
	🚧 API Sistema Bancário 🚧
</h1>

<p align="center">
  <img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-green">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-endpoints">Endpoints</a> •
 <a href="#-como-executar">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a>
</p>

## 💻 Sobre o projeto

Esse projeto consiste na criação de uma API REST para um Banco Digital. Trata-se de um projeto piloto no qual serão implementadas outras funcionalidades futuramente. Esta API permite criar e gerenciar contas bancárias, realizar transações como depósitos, saques e transferências, além de consultar saldo e emitir extratos bancários.

## 🔗 Endpoints

### Listar contas bancárias

`GET` `/contas?senhaBanco={Senha do banco}`

Esse endpoint permite listar todas as contas bancárias existentes. É necessário informar a senha do banco como parâmetro de consulta.

### Criar conta bancária

`POST` `/contas`

Esse endpoint permite criar uma conta bancária, gerando um número único de identificação da conta (número da conta). O body da requisição deverá possuir as seguintes propriedades:

```json
{
  "nome": "Nome",
  "cpf": "CPF",
  "dataNascimento": "Data de nascimento",
  "telefone": "Telefone",
  "email": "E-mail",
  "senha": "Senha"
}
```

### Atualizar usuário da conta bancária

`PUT` `/contas/:numeroConta/usuario`

Esse endpoint permite atualizar os dados do usuário de uma conta bancária. O body da requisição deverá possuir as seguintes propriedades:

```json
{
  "nome": "Nome atualizado",
  "cpf": "CPF atualizado",
  "dataNascimento": "Data de nascimento atualizada",
  "telefone": "Telefone atualizado",
  "email": "E-mail atualizado",
  "senha": "Senha atualizada"
}
```

### Excluir conta bancária

`DELETE` `/contas/:numeroConta`

Esse endpoint permite excluir uma conta bancária existente. É necessário que não haja saldo na conta.

### Saldo

`GET` `/contas/saldo?numeroConta={Número da conta}&senha={Senha}`

Esse endpoint permite consultar o saldo de uma conta bancária existente. É necessário informar o número da conta e a senha da conta como parâmetro de consulta.

### Extrato

`GET` `/contas/extrato?numeroConta={Número da conta}&senha={Senha}`

Esse endpoint permite consultar o extrato de uma conta bancária existente. É necessário informar o número da conta e a senha da conta como parâmetro de consulta.

### Depositar

`POST` `/transacoes/depositar`

Esse endpoint permite realizar um depósito em uma conta bancária existente. O body da requisição deverá possuir as seguintes propriedades:

```json
{
  "numeroConta": "Número da conta",
  "valor": 1000
}
```

Além disso é criado um registro do depósito:

```json
{
  "data": "Data e horário do depósito",
  "numeroConta": "Número da conta",
  "valor": 1000
}
```

### Sacar

`POST` `/transacoes/sacar`

Esse endpoint permite realizar um saque em uma conta bancária existente. O body da requisição deverá possuir as seguintes propriedades:

```json
{
  "numeroConta": "Número da conta",
  "valor": 1000,
  "senha": "Senha"
}
```

Além disso é criado um registro do saque:

```json
{
  "data": "Data e horário do saque",
  "numeroConta": "Número da conta",
  "valor": 1000
}
```

### Transferir

`POST` `/transacoes/transferir`

Esse endpoint permite a transferência entre duas contas bancárias existentes. O body da requisição deverá possuir as seguintes propriedades:

```json
{
  "numeroContaOrigem": "Número da conta de origem",
  "numeroContaDestino": "Número da conta de destino",
  "valor": 1000,
  "senha": "Senha"
}
```

Além disso é criado um registro da transferência:

```json
{
  "data": "Data e horário da transferência",
  "numeroContaOrigem": "Número da conta de origem",
  "numeroContaDestino": "Número da conta de destino",
  "valor": 1000
}
```

## 🛣️ Como executar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). Além disso, é bom ter um editor para trabalhar com o código como [Visual Studio Code](https://code.visualstudio.com/).

### Rodando o servidor

```bash

# Clone este repositório
$ git clone git@github.com:cubos-academy/academy-template-readme-projects.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd api-sistema-bancario

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

### Requisições

Para testar e interagir com a API, recomendo o uso de ferramentas como o [Insomnia](https://insomnia.rest/) e [Postman](https://www.postman.com/). Disponibilizei um arquivo exportado do Insomnia com as requisições. Basta importá-lo na ferramenta e começar a [testar](insomnia-requests.json).

## 🛠 Tecnologias

- **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)**
- **[Node.js](https://nodejs.org/en/)**
- **[Express.js](https://expressjs.com/)**
