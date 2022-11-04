import { Arg, Mutation, Resolver } from "type-graphql";
import { RedisStoreInstance } from "../../lib/redis";

import { User } from "../../entities/auth/user.entity";
import { OtpGenerator } from "../../utils/otpGenerator";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => String)
  async sendPasswordRecoveryEmail(
    @Arg("email") email: string
  ): Promise<string> {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return "User Doesn't Found. Try Again";
    }

    const resetOTP = OtpGenerator();
    console.log(resetOTP);
    RedisStoreInstance.set("otp", resetOTP);

    return "OTP Has Been Sent To Your Email";
  }

  @Mutation(() => User)
  async resetPassword(
    @Arg("email") email: string,
    @Arg("newPassword") newPassword: string,
    @Arg("otp") otp: string
  ): Promise<void | boolean | number> {
    // let user = await User.findOne({
    //   where: { email },
    // });

    // const existingOTP = await RedisStoreInstance.get("otp");
    // if (user && existingOTP === otp) {
    //   user.password = await bcrypt.hash(newPassword, 12);
    //   user.save();
    //   RedisStoreInstance.del("otp");

    //   return true;
    // }

    return false;
  }
}
