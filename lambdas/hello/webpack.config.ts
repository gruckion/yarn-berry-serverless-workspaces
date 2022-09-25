import getWebpackConfig from "../../webpack.config.base";
import slsw from "serverless-webpack";

// TODO (Stephen): Typescript configuration must be off - Cannot find name '__dirname'.ts(2304)
const config = getWebpackConfig(__dirname, slsw);

export default config;
