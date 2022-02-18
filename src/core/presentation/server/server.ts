// import express from "express";
// import cors from "cors";
// import { makeRoutes } from "../routes/routes";

// const app = express();
// app.use(express.json());
// app.use(cors());
// makeRoutes(app);

// export const initServer = async () => {
//   await app.listen(process.env.PORT || 8081, () => console.log("Server ON"));
// };

// export { app };

import express from "express";
import cors from "cors";
import { makeRoutes } from "../routes/routes";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  makeRoutes(app);

  return app;
};

export const initServer = async (app?: any) => {
  app = app ?? createServer();

  await app.listen(process.env.PORT || 8081, () => console.log("Server ON"));
};
