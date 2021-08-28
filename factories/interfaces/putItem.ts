import { BaseRequestResponse } from "infrastructure/interfaces/User/user";

export interface PutItemActionResult<ReturnItemType> extends BaseRequestResponse {
  results: ReturnItemType | ReturnItemType[];
}
