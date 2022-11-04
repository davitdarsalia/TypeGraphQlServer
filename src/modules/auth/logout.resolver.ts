import { Mutation, Resolver, Arg, Query } from "type-graphql";

import { AuthContext } from "../../types/generics/authContext";

@Resolver()
export class LogoutResolver {
  @Query()
  @Mutation()
  async logout(@Arg("ctx") ctx: AuthContext): Promise<void> {
    ctx.req.headers["authorization"] === "";
  }
}
