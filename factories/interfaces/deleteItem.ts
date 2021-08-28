import { BaseRequestResponse } from "infrastructure/interfaces/User/user";

export interface DeteleItemActionResult<ReturnItemType> extends BaseRequestResponse {
  results: ReturnItemType | ReturnItemType[];
}
