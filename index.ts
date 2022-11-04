import "reflect-metadata";

import * as Express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import session from "express-session";
import connectRedis from "connect-redis";

import { RegisterResolver } from "./src/modules/auth/Register.resolver";
import { ProductResolver } from "./src/modules/content/addProduct.resolver";

import { RedisStoreInstance } from "./src/lib/redis";
import cors from "cors";

import { LoginResolver } from "./src/modules/auth/login.resolver";
import { ConfirmUserResolver } from "./src/modules/auth/confirmUser.resolver";
import { ForgotPasswordResolver } from "./src/modules/auth/forgotPassword.resolver";

const main = async () => {
  const connection = await createConnection();
  await connection.synchronize();

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      ProductResolver,
      LoginResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });

  const app = Express.default();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: RedisStoreInstance as any,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => console.log(`Server Started On localhost:4000`));
};

main();
