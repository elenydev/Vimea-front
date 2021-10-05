import { FormStore } from "managers/FormManager/interfaces";
import FormManager from "managers/FormManager/FormManager";
import { createSliceWithSaga } from "redux-toolkit-with-saga";

const initialState: FormStore = {
  manager: new FormManager(),
};

const formManagerStore = createSliceWithSaga({
  name: "formManagerStore",
  initialState,
  reducers: {},
});

export default formManagerStore.reducer;
