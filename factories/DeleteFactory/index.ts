import { getCookie } from "services/cookieService";
import { getErrorResponse } from "utils/getErrorResponse";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import { USER_COOKIE } from "contants";
import { BaseRequestResponse } from "infrastructure/interfaces/User/user";
import { DeteleItemActionResult } from "factories/interfaces/deleteItem";

export const deleteItem = async <ReturnItemType>(
  path: string,
  requireAuth = false,
  queryParams = {},
): Promise<DeteleItemActionResult<ReturnItemType> | BaseRequestResponse> => {
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

    const request = await fetch(`${path}?${params.join("&")}`, {
      method: "DELETE",
      headers: {
        ...authorizationHeader,
      },
    });
    const response = await request.json();
    return databaseResponse<ReturnItemType>(request.ok, response);
  } catch (error) {
    getErrorResponse(error.message)
  }
};

export const databaseResponse = <ReturnItemType>(
  isSuccesfullResponse: boolean,
  response: DeteleItemActionResult<ReturnItemType>
): DeteleItemActionResult<ReturnItemType> | BaseRequestResponse => {
  if (isSuccesfullResponse) {
    return {
      results: response.results,
      responseStatus: ResponseStatus.SUCCESS,
      message: response.message,
    };
  }
  return getErrorResponse(response.message);
};
