import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcryptjs";

import { LoginInput } from "./login.inputType";
import { GraphQlLoginResponse, loginResponse } from "../../types/loginTypes";
import { SignToken } from "../../utils/jwt";
@Resolver()
export class LoginResolver {
  @Mutation(() => GraphQlLoginResponse, { nullable: true })
  async login(
    @Arg("loginInput") { email, password }: LoginInput
  ): Promise<loginResponse | null | string> {
    const user = await User.findOne({ where: { email } });

    const validPassword = await bcrypt.compare(password, user!.password);

    if (!user) {
      return null;
    }

    if (!validPassword) {
      return null;
    }

    if (!user.confirmed) {
      return "User Is Not Confirmed. Try Confirm Yourself Via Address";
    }

    const accessToken = SignToken(user, "Access");
    const refreshToken = SignToken(user, "Refresh");

    const successObj: loginResponse = {
      userID: user.id,
      accessToken,
      accessTokenExpiryTime: 7,
      refreshToken,
      refreshTokenExpiryTime: 7,
      code: 200,
    };

    return successObj;
  }
}
