import { formatJSONResponse, FormattedJSONResponse } from "@gruckion/common";
import { middyfy } from "@gruckion/common";
import { Handler } from "aws-lambda";
import { MongoClient } from "mongodb";

type HelloEvent = {
  body: {
    name: string;
  };
};

const hello: Handler<HelloEvent, FormattedJSONResponse> = async (
  event
): Promise<FormattedJSONResponse> => {
  const dbUrl =
    "MONGODB_DB_USED://username:password@clusterUrl/MONGODB_DB?authMechanism=DEFAULT";
  console.log("Initialising mongodb connection");
  console.log(` - Connecting to "${dbUrl}"`);

  const client = new MongoClient(dbUrl);

  try {
    await client.connect();
  } finally {
    await client.close();
  }

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
