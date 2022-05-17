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
import SwaggerUI from 'swagger-ui-express';
import swaggerTsConfig from '../../../../swagger';

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerTsConfig));

  makeRoutes(app);

  return app;
};

export const initServer = async (app?: any) => {
  app = app ?? createServer();

  await app.listen(process.env.PORT || 8081, () => console.log("Server ON"));
};
