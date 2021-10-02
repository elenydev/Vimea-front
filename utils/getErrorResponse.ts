import { ResponseStatus } from "infrastructure/enums/Request/Request";

export const getErrorResponse = (error: string) => ({
  message: error,
  responseStatus: ResponseStatus.FAILED,
});
