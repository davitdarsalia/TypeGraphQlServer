import { Mutation, Resolver, Arg, Query,  } from "type-graphql";
import { GlobalRedisClient } from "../../../redis";
import { AuthContext } from "../../types/authContext";

@Resolver()
export class LogoutResolver {
  @Query()
  @Mutation()
  async logout(@Arg("ctx") ctx: AuthContext): Promise<void> {
    ctx.req.headers["authorization"] === "";
  }
}
