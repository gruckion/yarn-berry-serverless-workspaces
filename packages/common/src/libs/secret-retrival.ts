import { SecretsManager } from "aws-sdk";

class SecretRetrievalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SecretRetrievalError";
  }
}

/**
 * Gets the payload of a secret by the secrets ARN
 * @param secretArn the arn string for the secret
 * @returns the secret name
 */
export const getSecret = async <T = Record<string, unknown>>(
  secretArn: string
): Promise<T | null> => {
  const client = new SecretsManager();

  const secretName = extractSecretName(secretArn);

  if (!secretName) {
    throw new SecretRetrievalError("No secret name provided");
  }

  try {
    const response = await client
      .getSecretValue({ SecretId: secretName })
      .promise();

    if (response === undefined) {
      throw new SecretRetrievalError("Missing data response for AWS Secret");
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

  return null;
};

/**
 * AWS doesn't allow us to get the secrets name and Terraform / Serverless string manipulation is poor for completely lacking
 * @param secretArn the arn string for the secret
 * @returns the secret name
 */
const extractSecretName = (secretArn: string) => {
  if (!secretArn) {
    throw new SecretRetrievalError("No secretArn provided");
  }

  const secretName = secretArn
    .split(":")[6]
    .substring(0, secretArn.split(":")[6].lastIndexOf("-"));
  return secretName;
};
