import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { LoginInput } from "./login.inputType";

import { GraphQlLoginResponse, loginResponse } from "../../types/loginTypes";

export const signature = "nd1infi84ng82n8f1n39ef953n4g8gn";
const refreshSignature =
  "fm294gj49gj924rj3g89n4g8n29gjnm92jgn95nh94nnhg4in3n9h4ihn3ignri3";

@Resolver()
export class LoginResolver {
  @Mutation(() => GraphQlLoginResponse, { nullable: true })
  async login(
    @Arg("loginInput") { email, password }: LoginInput
  ): Promise<loginResponse | null> {
    const user = await User.findOne({ where: { email } });

    const validPassword = await bcrypt.compare(password, user!.password);

    if (!user) {
      return null;
    }

    if (!validPassword) {
      return null;
    }

    const accessToken = sign(
      {
        userId: user.id,
        email: user.email,
        issuedAt: new Date().toLocaleDateString(),
      },
      signature,
      {
        expiresIn: "1m",
      }
    );

    const refreshToken = sign(
      {
        userId: user.id,
        email: user.email,
        issuedAt: new Date().toLocaleDateString(),
      },
      refreshSignature,
      {
        expiresIn: "1m",
      }
    );

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
