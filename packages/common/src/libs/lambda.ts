import "source-map-support/register";

import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { Handler, Context } from "aws-lambda";

/**
 * Let's "middyfy" our handler, then we will be able to attach middlewares to it
 * @param handler the Lambda handler to middyfy
 * @returns a middyfied handler with attached middlewares
 */
export const middyfy = <TEvent = any, TResult = any>(
  handler: Handler<TEvent, TResult>
): middy.Middy<TEvent, unknown, Context> => {
  return middy(handler).use(middyJsonBodyParser());
};
