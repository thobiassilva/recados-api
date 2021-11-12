import cors from "cors";
import express from "express";
import { messageRoutes } from "./routes/messages.routes";
import { authorizationValid } from "./middlewares/middlewares";
import { routes } from "./routes/auth.routes";

let app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.use(authorizationValid);
app.use("/messages", messageRoutes);

app.listen(process.env.PORT || 8081, () => console.log("Server ON"));
