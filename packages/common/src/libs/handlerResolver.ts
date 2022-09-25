/**
 * Used to get the handler path for the lambda function
 * @param context current path of the active file
 * @returns path to handler
 */
export const handlerPath = (context: string): string => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
};
