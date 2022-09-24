export type FormattedJSONResponse = {
  statusCode: number;
  body: string;
};

/**
 * All lambda responses must be of this type, unless an error is being thrown
 * @param response response to return
 * @param statusCode http status code
 * @returns the status code and response inside body
 */
export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode = 200
): FormattedJSONResponse => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
