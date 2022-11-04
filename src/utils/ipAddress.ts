import * as ipaddr from "ipaddr.js";

export const IPMiddleware = (): Array<number> => {
  return ipaddr.parse("2a00:1450:8007::68").toByteArray();
};
