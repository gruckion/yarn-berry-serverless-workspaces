import { hello } from "./src/functions";
import { serverlessConfigurationBuilder } from "@gruckion/common";

const serverlessConfiguration = serverlessConfigurationBuilder()
  .withService("lambdas-hello")
  .withFunctions({
    hello,
  })
  .build();

module.exports = serverlessConfiguration;
