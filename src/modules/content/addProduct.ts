import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { category, Product } from "../../entities/product.entity";

@Resolver(Product)
export class ProductResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World";
  }

  @Mutation(() => Product)
  async addProduct(
    @Arg("name") name: string,
    @Arg("purchaseDate") purchaseDate: string,
    @Arg("discounted") discounted: boolean,
    @Arg("price") price: number,
    @Arg("category") category: category
  ): Promise<Product> {
    const product = Product.create({
      name,
      purchaseDate,
      discounted,
      price,
      category,
    }).save();

    return product;
  }
}
