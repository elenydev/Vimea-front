import { BaseRequestResponse } from "infrastructure/interfaces/User/user";

export interface PostItemsActionResult<ReturnItemType> extends BaseRequestResponse {
  results: ReturnItemType[];
}
