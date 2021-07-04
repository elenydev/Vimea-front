import { createAction } from "@/../utils/redux/index";
import FormManager from "@/../managers/FormManager/FormManager";

export const setFormManager = createAction<FormManager>('setFormManager');