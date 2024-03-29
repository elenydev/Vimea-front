import { UseFormMethods } from "react-hook-form";
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";

export interface FormManagerInstance {
    formName: FORM_INSTANCE_NAME
    formInstance: UseFormMethods<any>,    
}