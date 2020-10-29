# Regras de negócio

Abaixo segue uma lista de regras de negócio referente às operações de CRUD dos usuários de um sistema. Essas regras foram baseadas na operação de um sistema de criação de usuários comuns.

### Criação de usuários

1. Um usuário deve informar nome, e-mail e senha para conseguir criar uma conta;
2. Um usuário não pode criar uma conta usando um e-mail que já está cadastrado no banco de dados;
3. A senha informada pelo usuário não pode conter menos que 6 caracteres;

### Leitura de usuários

1. Para ler um usuário do banco de dados o usuário deve informar o _id ou o e-mail do usuário;

### Atualização de usuários

1. Para atualizar um usuário devem ser informados ao menos o nome e e-mail;
2. O _id do usuário deve ser informado também pois desta forma teremos como confirmar que o e-mail informado e o _id são da mesma pessoa, em casos onde o e-mail é alterado para um já utilizado;
3. O usuário não poderá atualizar seu próprio e-mail para um e-mail já cadastrado anteriormente por outro usuário;
4. O usuário pode alterar sua senha;

### Deleção de usuários

1. Para deletar um usuário deve ser informado o e-mail ou o _id deste usuário;