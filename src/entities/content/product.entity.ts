import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type category = "technics" | "food" | "drugs";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  purchaseDate: string;

  @Field()
  @Column()
  discounted: boolean;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  category: category;
}
