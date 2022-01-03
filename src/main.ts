import cors from "cors";
import express, { Response } from "express";
import { messageRoutes } from "./routes/messages.routes";
import { authorizationValid } from "./middlewares/middlewares";
import { routes } from "./routes/auth.routes";
import { initConnection } from "./database/connection";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res: Response) => {
  try {
    return res.status(200).send({ success: true, message: "Server ON" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

app.use(routes);
app.use(authorizationValid);
app.use("/messages", messageRoutes);

initConnection()
  .then(() =>
    app.listen(process.env.PORT || 8082, () => console.log("Server ON"))
  )
  .catch((error) => {
    console.log("Erro na comunicação com o Banco de Dados");
    console.log({ error });
  });
