// import { v4 as uuid } from "uuid";
// import { Connection, Repository } from "typeorm";
// import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
// import { User } from "../../../../core/infra/database/entities/user.entity";
// import { AuthParams, HttpResponse } from "../../../../utils/interfaces";

// export class AuthController {
//   private readonly connection: Connection;
//   private readonly repository: Repository<User>;

//   constructor() {
//     this.connection = DatabaseConnection.getConnection();
//     this.repository = this.connection.getRepository(User);
//   }

//   async login(authParams: AuthParams): Promise<HttpResponse> {
//     if (!authParams.login || !authParams.password) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Dados não informados." },
//       };
//     }

//     const users = await this.repository.find({
//       where: { login: authParams.login },
//     });

//     if (users.length <= 0) {
//       return {
//         statusCode: 404,
//         body: { success: false, message: "Usuário não encontrado" },
//       };
//     }

//     const user = users.find((u) => u.password === authParams.password);

//     if (!user) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Senha inválida" },
//       };
//     }

//     return {
//       body: { success: true, data: user!.uid, message: "Sucesso" },
//       statusCode: 200,
//     };
//   }

//   async register(authParams: AuthParams): Promise<HttpResponse> {
//     if (!authParams.login || !authParams.password) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Dados não informados." },
//       };
//     }

//     let userAlreadyRegistered = await this.repository.find({
//       where: { login: authParams.login },
//     });

//     if (userAlreadyRegistered.length > 0) {
//       return {
//         statusCode: 400,
//         body: {
//           success: false,
//           message: "Usuário já registrado. Tente outro username ou faça login.",
//         },
//       };
//     }

//     const user = new User();
//     user.uid = uuid();
//     user.login = authParams.login;
//     user.password = authParams.password;

//     await this.repository.save(user);

//     return {
//       body: { success: true, data: user!.uid, message: "Sucesso" },
//       statusCode: 200,
//     };
//   }
// }
