import * as bcrypt from "bcryptjs";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { User } from "../../entities/user.entity";
import { RegisterInput } from "./registerInput.inputType";
import { isAuth } from "../../utils/jwt";
import { generateConfirmationURL, sendEmail } from "../../utils/email";

@Resolver(User)
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "S";
  }

  @FieldResolver(() => String)
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("userInput")
    { email, firstName, lastName, secretKey, password }: RegisterInput
  ): Promise<User> {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      secretKey: secretKey,
      password: await bcrypt.hash(password, 12),
    }).save();

    await sendEmail(email,await generateConfirmationURL(user.id));

    return user;
  }
}
