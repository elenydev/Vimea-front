import { FormManagerArgs } from "@/../infrastructure/interfaces/Form/form";
import { useForm, UseFormMethods } from "react-hook-form";
import { FORM_INSTANCE_NAME } from "@/../infrastructure/enums/Form/form";

export default class FormManager {
    formInstance: UseFormMethods<any>;
    formName: FORM_INSTANCE_NAME;
    
    constructor(args: FormManagerArgs) {
        const { formName, formInstance } = args;
        this.formName = formName;
        this.formInstance = formInstance;
    }

    clearCurrentForm(): void {
        this.formInstance.reset();
    }
}