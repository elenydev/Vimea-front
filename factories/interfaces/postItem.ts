import { BaseRequestResponse } from "infrastructure/interfaces/User/user";

export interface PostItemActionResult<ReturnItemType> extends BaseRequestResponse {
  results: ReturnItemType | ReturnItemType[];
}