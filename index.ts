import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as Express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./src/modules/user/Register";
import { ProductResolver } from "./src/modules/content/addProduct";
import session from "express-session";
import connectRedis from "connect-redis";
import { GlobalRedisClient } from "./redis";
import cors from "cors";
import { LoginResolver } from "./src/modules/user/login";

const main = async () => {
  const connection = await createConnection();
  await connection.synchronize();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, ProductResolver, LoginResolver],
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
        client: GlobalRedisClient as any,
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

  // app.use((req, res, next) => {
  // });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => console.log(`Server Started On localhost:4000`));
};

main();
