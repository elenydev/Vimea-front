import { getCookie } from "services/cookieService";
import { getErrorResponse } from "utils/getErrorResponse";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import { USER_COOKIE } from "contants";
import { GetListActionResult } from "factories/interfaces/getList";
import { BaseRequestResponse } from "infrastructure/interfaces/User/user";
import { GetItemActionResult } from "factories/interfaces/getItem";

export const getList = async <ListItemType>(
  path: string,
  requireAuth = false,
  queryParams = {},
  pagination = {
    pageNumber: 1,
    pageSize: 20
  }
): Promise<GetListActionResult<ListItemType> | BaseRequestResponse> => {
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
      },
    });
    const response = await request.json();
    return databaseResponse<ListItemType>(request.ok, response, true);
  } catch (error) {
    getErrorResponse(error.message);
  }
};

export const getItem = async <ListItemType>(
  path: string,
  requireAuth = false,
  queryParams = {}
): Promise<GetItemActionResult<ListItemType> | BaseRequestResponse> => {
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeader,
      },
    });
    const response = await request.json();
    return databaseResponse<ListItemType>(request.ok, response, false);
  } catch (error) {
    getErrorResponse(error.message);
  }
};

export const databaseResponse = <ListItemType>(
  isSuccesfullResponse: boolean,
  response:
    | GetListActionResult<ListItemType>
    | GetItemActionResult<ListItemType>,
  multipleResults = false
):
  | GetListActionResult<ListItemType>
  | GetItemActionResult<ListItemType>
  | BaseRequestResponse => {
  const baseResult = multipleResults
    ? { results: (response as GetListActionResult<ListItemType>).results }
    : { result: (response as GetItemActionResult<ListItemType>).result };
  if (isSuccesfullResponse) {
    return {
      ...baseResult,
      responseStatus: ResponseStatus.SUCCESS,
      message: response.message,
    };
  }
  return getErrorResponse(response.message);
};
