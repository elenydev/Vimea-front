import { Action, handleActions } from "utils/redux";
import { ReducerMap } from "redux-actions";
import * as actions from 'managers/FormManager/actions';
import { FormStore } from "managers/FormManager/interfaces";
import FormManager from "managers/FormManager/FormManager";

const initialState: FormStore = {
    manager: new FormManager()
};

const reducerMap: ReducerMap<FormStore, any> = {
  [actions.setFormManager]: (
    state,
    action: Action<FormManager>
  ): FormStore => ({
    ...state,
    manager: action.payload
  })
};

export default handleActions(reducerMap, initialState);
