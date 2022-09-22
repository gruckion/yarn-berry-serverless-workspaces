import { formatJSONResponse } from 'libs/apiGateway';
import { middyfy } from 'libs/lambda';
import { Handler } from 'aws-lambda';
import { handlerPath } from "libs/handlerResolver";

const hello: Handler<any> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
}

console.log({ x: handlerPath(__dirname)})

export const main = middyfy(hello);
