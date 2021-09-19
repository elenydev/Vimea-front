import { getCookie } from "services/cookieService";
import { getErrorResponse } from "utils/getErrorResponse";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import { USER_COOKIE } from "utils/constants";
import { BaseRequestResponse } from "infrastructure/interfaces/User/user";
import { PutItemActionResult } from "factories/interfaces/putItem";

export const putItem = async <ReturnItemType>(
  path: string,
  body: Object,
  requireAuth = false,
  includeFile = false,
  queryParams = {},
): Promise<PutItemActionResult<ReturnItemType> | BaseRequestResponse> => {
  try {
    const token = getCookie(USER_COOKIE);
    const params = Object.keys(queryParams).reduce(
      (allParams: string[], currentParam) => {
        allParams.push(`${currentParam}=${queryParams[currentParam]}`);
        return allParams;
      },
      []
    );

    const authorizationHeader = requireAuth && {
      Authorization: `Bearer ${token}`,
    };

    const contentTypeHeader = !includeFile && {
        "Content-Type": "application/json",
    };

    const request = await fetch(`${path}?${params.join("&")}`, {
      method: "PUT",
      headers: {
        ...contentTypeHeader,
        ...authorizationHeader,
      },
      body: (includeFile ? body : JSON.stringify(body)) as BodyInit
    });
    const response = await request.json();
    return databaseResponse<ReturnItemType>(request.ok, response);
  } catch (error) {
    getErrorResponse(error.message)
  }
};

export const databaseResponse = <ReturnItemType>(
  isSuccesfullResponse: boolean,
  response: PutItemActionResult<ReturnItemType>
): PutItemActionResult<ReturnItemType> | BaseRequestResponse => {
  if (isSuccesfullResponse) {
    return {
      results: response.results,
      responseStatus: ResponseStatus.SUCCESS,
      message: response.message,
    };
  }
  return getErrorResponse(response.message);
};
