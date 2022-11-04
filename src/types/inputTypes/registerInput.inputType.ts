import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyUsed } from "../../customDecorators/isEmailUsed.decorator";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 70, {
    message:
      "Validation Layer: Incorrect FirstName: Use 1 - 70 Length FirstName",
  })
  firstName: string;

  @Field()
  @Length(1, 70, {
    message:
      "Validation Layer: Incorrect LastName: Use 1 - 70 Length FirstName",
  })
  lastName: string;

  @Field()
  @IsEmail(
    { message: "Validation Layer: Incorrect Email, Or It Doesn't Exists" },
    { message: "Validation Layer: Incorrect Email, Or It Doesn't Exists" }
  )
  @IsEmailAlreadyUsed({
    message: "User With Your Email Does Exists",
  })
  email: string;

  @Field()
  @Length(10, 50, {
    message:
      "Validation Layer: Incorrect Length: Use 10 - 50 Length Secret Key",
  })
  secretKey: string;

  @Field()
  @Length(10, 100, {
    message: "Validation Layer: Incorrect Length: Use 10 - 50 Length Password",
  })
  password: string;
}
