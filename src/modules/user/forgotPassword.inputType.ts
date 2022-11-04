import { Field, InputType } from "type-graphql";

@InputType()
export class ForgotPasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  newPassword: string;
}
