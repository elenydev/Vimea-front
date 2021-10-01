import { createRoutine } from "utils/redux/routines";

import FormManager from "managers/FormManager/FormManager";

export enum FormManagerRoutines {
  SetFormManager = "setFormManager",
}

export const setFormManager = createRoutine<FormManager>(
  FormManagerRoutines.SetFormManager
);
