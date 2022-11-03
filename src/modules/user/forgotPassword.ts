import * as bcrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../../entities/user.entity";
import { ForgotPasswordInput } from "./forgotPassword.inputType";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("input")
    { email, password, newPassword }: ForgotPasswordInput
  ): Promise<string> {
    const user = await User.findOne({
      where: { email, password },
    });

    if (!user) {
      return "User Doesn't Found. Try Again";
    }

    // Step 2 - Send Confirmation Code And If === , Update An User
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return "Password Had Been Successfully Reset";
  }
}
