import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../../entities/user.entity";
import { GlobalRedisClient } from "../../../redis"; 

@Resolver(User)
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("id") id: string): Promise<boolean> {
    const userID = await GlobalRedisClient.get(id);

    if (!userID) {
      return false;
    }

    await User.update({ id: parseInt(userID, 10) }, { confirmed: true });

    await GlobalRedisClient.del(userID);
    return true;
  }
}
