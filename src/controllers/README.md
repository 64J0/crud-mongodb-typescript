# Regras de negócio

Abaixo segue uma lista de regras de negócio referente às operações de CRUD dos usuários de um sistema.

### Criação de usuários

1. Um usuário deve informar nome, email e senha para conseguir criar uma conta;
2. Um usuário não pode criar uma conta usando um e-mail que já está cadastrado no banco de dados;

### Leitura de usuários

1. Para ler um usuário do banco de dados o usuário deve informar o id deste usuário;

### Atualização de usuários

1. Para atualizar um usuário devem ser informados o nome e e-mail, sendo o _id do usuário informado nos parâmetros da URL;
2. Não será possível atualizar a senha inicialmente devido a dificuldade de implementar essa funcionalidade;
3. O usuário não poderá atualizar seu próprio e-mail para um e-mail já cadastrado anteriormente por outro usuário;

### Deleção de usuários

1. Para deletar um usuário deve ser informado o e-mail deste nos parâmetros da requisição;