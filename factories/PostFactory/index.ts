import { getCookie } from "services/cookieService";
import { getErrorResponse } from "utils/getErrorResponse";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import { USER_COOKIE } from "constants";
import { BaseRequestResponse } from "infrastructure/interfaces/User/user";
import { PostItemActionResult } from "factories/interfaces/postItem";
import { PostItemsActionResult } from "factories/interfaces/postItems";

export const postItem = async <ReturnItemType>(
  path: string,
  body: Object,
  requireAuth = false,
  includeFile = false,
  queryParams = {}
): Promise<PostItemActionResult<ReturnItemType> | BaseRequestResponse> => {
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
      method: "POST",
      headers: {
        ...contentTypeHeader,
        ...authorizationHeader,
      },
      body: (includeFile ? body : JSON.stringify(body)) as BodyInit,
    });
    const response = await request.json();
    return Promise.resolve(
      databaseResponse<ReturnItemType>(request.ok, response, false)
    );
  } catch (error) {
    return Promise.reject(getErrorResponse(error.message));
  }
};

export const databaseResponse = <ReturnItemType>(
  isSuccesfullResponse: boolean,
  response:
    | PostItemActionResult<ReturnItemType>
    | PostItemsActionResult<ReturnItemType>,
  multipleResults = false
):
  | PostItemActionResult<ReturnItemType>
  | PostItemsActionResult<ReturnItemType>
  | BaseRequestResponse => {
  const baseResult = multipleResults
    ? { results: (response as PostItemsActionResult<ReturnItemType>).results }
    : { result: (response as PostItemActionResult<ReturnItemType>).result };
  if (isSuccesfullResponse) {
    return {
      ...baseResult,
      responseStatus: ResponseStatus.SUCCESS,
      message: response.message,
    };
  }
  return getErrorResponse(response.message);
};
