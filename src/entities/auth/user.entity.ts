import { Field, ID, ObjectType, Root } from "type-graphql";
import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", {
    unique: true,
  })
  email: string;

  @Field()
  @Column()
  secretKey: string;

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  // @Field() - We can put state merges in entity, instead of resolver
  // @Column()
  // name(@Root() parent: User): string {
  //   return `${parent.name} ${parent.lastName}`
  // }
}
