import { BaseRequestResponse } from "infrastructure/interfaces/User/user";

export interface GetListActionResult<ListItemType> extends BaseRequestResponse {
  results: ListItemType;
}
