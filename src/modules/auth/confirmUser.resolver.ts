import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../../entities/auth/user.entity";
import { RedisStoreInstance } from "../../lib/redis";

@Resolver(User)
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("id") id: string): Promise<boolean> {
    const userID = await RedisStoreInstance.get(id);

    if (!userID) {
      return false;
    }

    await User.update({ id: parseInt(userID, 10) }, { confirmed: true });

    await RedisStoreInstance.del(userID);
    return true;
  }
}
