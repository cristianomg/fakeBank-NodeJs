module.exports = {
  endpoints: {
    User: {
      index: {
        router: "/users",
        method: "get",
        description: "retornar a listagem dos usuários cadastrados",
      },
      show: {
        router: "/users/{id}",
        method: "get",
        params: {
          id: "integer",
        },
        description: "retornar dados do usuário passado na rota",
      },
      create: {
        router: "/users",
        method: "post",
        body: {
          firstName: "string",
          lastName: "string",
          cpfCnpjFormatado: "string",
          account: "number",
          password: "string",
        },
        description: "Cria um novo usuário",
      },
    },
    Transaction: {
      deposit: {
        router: "/users/{user_id}/deposit",
        params: {
          user_id: "integer",
        },
        body: {
          value: "decimal",
        },
        description: "realiza um deposito na conta do usuário passado na rota",
      },
      withdraw: {
        router: "/users/{user_id}/withdraw",
        params: {
          user_id: "integer",
        },
        body: {
          value: "decimal",
        },
        description: "realiza um saque na conta do usuário passado na rota",
      },
    },
  },
};
