// export const messageRoutes = express.Router();

// messageRoutes.get("/", async (req: Request, res: Response) => {
//   try {
//     const userUid = req.headers.authorization!;

//     const result = await new MessageController().getMessages(userUid);

//     return res.status(result.statusCode).send(result.body);
//   } catch (error) {
//     console.log({ error });
//     return res.status(500).send({ success: false, message: "Erro interno" });
//   }
// });

// messageRoutes.post("/", async (req: Request, res: Response) => {
//   try {
//     const userUid = req.headers.authorization!;

//     const messageParams: MessageParams = req.body;

//     const result = await new MessageController().createMessage(
//       userUid,
//       messageParams
//     );

//     return res.status(result.statusCode).send(result.body);
//   } catch (error) {
//     console.log({ error });
//     return res.status(500).send({ success: false, message: "Erro interno" });
//   }
// });

// messageRoutes.put("/:uid", async (req: Request, res: Response) => {
//   try {
//     const userUid = req.headers.authorization!;
//     const messageParams: MessageParams = req.body;
//     const messageUid: string = req.params.uid;

//     const result = await new MessageController().editMessage(
//       userUid,
//       messageParams,
//       messageUid
//     );

//     return res.status(result.statusCode).send(result.body);
//   } catch (error) {
//     return res.status(500).send({ success: false, message: "Erro interno" });
//   }
// });

// messageRoutes.delete("/:uid", async (req: Request, res: Response) => {
//   try {
//     const userUid = req.headers.authorization!;
//     const messageUid: string = req.params.uid;

//     const result = await new MessageController().deleteMessage(
//       userUid,
//       messageUid
//     );

//     return res.status(result.statusCode).send(result.body);
//   } catch (error) {
//     return res.status(500).send({ success: false, message: "Erro interno" });
//   }
// });
