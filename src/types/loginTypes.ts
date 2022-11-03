import { GraphQLObjectType, GraphQLString } from "graphql";
import { Int } from "type-graphql";

import { GraphQLScalarType, Kind } from "graphql";

export interface loginResponse {
  userID: number;
  accessToken: string;
  accessTokenExpiryTime: number;
  refreshToken: string;
  refreshTokenExpiryTime: number | string;
  code?: number;
}

export const loginResponseScalar = new GraphQLObjectType({
  name: "LoginResponse",

  fields: {
    userID: { type: Int },
    accessToken: { type: GraphQLString },
    accessTokenExpiryTime: { type: Int },
    refreshToken: { type: GraphQLString },
    refreshTokenExpiryTime: { type: Int },
    code: { type: Int },
  },
});

const CustomScalarConfig = {
  name: "SuccessfullLoginResponse",
  description: "A Response, Which You Get After A Successfull Log In",
  serialize: (value: any) => value,
  parseValue: (valie: any) => valie,
  parseLiteral: (ast: any) => ast.value,
};

export const GraphQlLoginResponse = new GraphQLScalarType(CustomScalarConfig);
