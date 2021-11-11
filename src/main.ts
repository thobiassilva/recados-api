import express from "express";
import { routes } from "./routes";

let app = express();
app.use(express.json());
app.use(routes);

app.listen(8081, () => console.log("Servidor iniciou"));
