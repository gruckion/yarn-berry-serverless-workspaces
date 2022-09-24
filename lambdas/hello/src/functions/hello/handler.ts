import { formatJSONResponse, FormattedJSONResponse } from "@gruckion/common";
import { middyfy } from "@gruckion/common";
import { Handler } from "aws-lambda";

type HelloEvent = {
  body: {
    name: string;
  };
};

const hello: Handler<HelloEvent, FormattedJSONResponse> = async (
  event
): Promise<FormattedJSONResponse> => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
