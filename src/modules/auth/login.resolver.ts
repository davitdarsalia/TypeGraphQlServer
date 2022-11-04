import * as bcrypt from "bcryptjs";

import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/auth/user.entity";

import {
  GraphQlLoginResponse,
  loginResponse,
} from "../../types/generics/loginTypes";
import { SignToken } from "../../utils/jwt";
import { LoginInput } from "../../types/inputTypes/login.inputType";

@Resolver()
export class LoginResolver {
  @Mutation(() => GraphQlLoginResponse, { nullable: true })
  async login(
    @Arg("loginInput") { email, password }: LoginInput
  ): Promise<loginResponse | string> {
    const user = await User.findOne({ where: { email } });

    const validPassword = await bcrypt.compare(password, user!.password);

    if (!user || !validPassword) {
      return "Wrong User";
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
