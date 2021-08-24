import { ResponseStatus } from "infrastructure/enums/Request/Request";

export const getErrorResponse = (error: string) => ({
  responseMessage: error,
  responseStatus: ResponseStatus.FAILED,
});
