// import { Connection, Repository } from "typeorm";
// import { v4 as uuid } from "uuid";
// import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
// import { Message } from "../../../../core/infra/database/entities/message.entity";
// import { HttpResponse, MessageParams } from "../../../../utils/interfaces";

// export class MessageController {
//   private readonly connection: Connection;
//   private readonly repository: Repository<Message>;

//   constructor() {
//     this.connection = DatabaseConnection.getConnection();
//     this.repository = this.connection.getRepository(Message);
//   }

//   async getMessages(uid: string): Promise<HttpResponse> {
//     const messages = await this.repository.find({ where: { userUid: uid } });
//     return {
//       statusCode: 200,
//       body: { success: true, data: messages, message: "Sucesso" },
//     };
//   }

//   async createMessage(
//     userUid: string,
//     messageParams: MessageParams
//   ): Promise<HttpResponse> {
//     if (!messageParams.title || !messageParams.detail) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Dados não informados." },
//       };
//     }

//     const message = new Message();
//     message.uid = uuid();
//     message.title = messageParams.title;
//     message.detail = messageParams.detail;
//     message.userUid = userUid;

//     await this.repository.save(message);

//     return {
//       statusCode: 200,
//       body: { success: true, data: message, message: "Sucesso" },
//     };
//   }

//   async editMessage(
//     userUid: string,
//     messageParams: MessageParams,
//     messageUid?: string
//   ): Promise<HttpResponse> {
//     if (!messageUid) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Uid não informado." },
//       };
//     }

//     if (!messageParams.title || !messageParams.detail) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Dados não informados." },
//       };
//     }

//     const message = await this.repository.find({
//       where: { uid: messageUid, userUid: userUid },
//     });

//     if (message.length <= 0) {
//       return {
//         statusCode: 404,
//         body: { success: false, message: "Mensagem nao encontrada" },
//       };
//     }

//     message[0].title = messageParams.title;
//     message[0].detail = messageParams.detail;

//     await this.repository.save(message[0]);

//     return {
//       statusCode: 200,
//       body: { success: true, data: message[0], message: "Sucesso" },
//     };
//   }

//   async deleteMessage(
//     userUid: string,
//     messageUid: string
//   ): Promise<HttpResponse> {
//     if (!messageUid) {
//       return {
//         statusCode: 400,
//         body: { success: false, message: "Uid não informado." },
//       };
//     }

//     const message = await this.repository.find({
//       where: { uid: messageUid, userUid: userUid },
//     });

//     if (message.length <= 0) {
//       return {
//         statusCode: 404,
//         body: { success: false, message: "Mensagem nao encontrada" },
//       };
//     }

//     await this.repository.delete({ uid: messageUid });

//     return {
//       statusCode: 200,
//       body: { success: true, message: "Sucesso" },
//     };
//   }
// }
