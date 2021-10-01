import { createReducer } from "deox";
import * as actions from "managers/FormManager/routines";
import { FormStore } from "managers/FormManager/interfaces";
import FormManager from "managers/FormManager/FormManager";

const initialState: FormStore = {
  manager: new FormManager(),
};

const formManagerReducer = createReducer(initialState, (handleAction) => [
  handleAction(actions.setFormManager.success, (state, { payload }) => {
    return {
      ...state,
      manager: payload,
    };
  }),
]);

export default formManagerReducer;
