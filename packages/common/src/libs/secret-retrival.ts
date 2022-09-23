import { SecretsManager } from "aws-sdk";

/**
 * Gets the payload of a secret by the secrets ARN
 * @param secretArn the arn string for the secret
 * @returns the secret name
 */
export const getSecret = async (secretArn: string) => {
  const client = new SecretsManager();

  const secretName = extractSecretName(secretArn);

  if (!secretName) {
    return;
  }

  try {
    const response = await client
      .getSecretValue({ SecretId: secretName })
      .promise();

    if (response === undefined) {
      // eslint-disable-next-line no-console
      console.error("Error, missing data response for AWS Secret");
      return null;
    }

    const { SecretString } = response;

    if (SecretString && SecretString.length > 0) {
      const parsed = JSON.parse(SecretString);
      return parsed;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw err;
  }
};

/**
 * AWS doesn't allow us to get the secrets name and Terraform / Serverless string manipulation is poor for completely lacking
 * @param secretArn the arn string for the secret
 * @returns the secret name
 *
 * @example extractSecretName("arn:aws:secretsmanager:eu-west-2:949828138320:secret:live-watt-experian-api-secret-PE9pxq") // live-watt-experian-api-secret
 */
const extractSecretName = (secretArn: string) => {
  if (!secretArn) {
    throw new Error("No secretArn provided");
  }

  const secretName = secretArn
    .split(":")[6]
    .substring(0, secretArn.split(":")[6].lastIndexOf("-"));
  return secretName;
};
