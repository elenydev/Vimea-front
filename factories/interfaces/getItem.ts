import { BaseRequestResponse } from "infrastructure/interfaces/User/user";

export interface GetItemActionResult<ListItemType> extends BaseRequestResponse {
  result: ListItemType;
}
