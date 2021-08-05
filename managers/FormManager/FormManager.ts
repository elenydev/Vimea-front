import { FormManagerInstance } from "infrastructure/interfaces/Form/form";
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";

export default class FormManager {
    forms: FormManagerInstance[] = [];
    
    public setFormInstance(formInstance: FormManagerInstance) {
        this.forms.push(formInstance);
    };

    public clearCurrentForm(currentFormName: FORM_INSTANCE_NAME): void {
        const currentForm = this.forms.find(({formName}) => formName === currentFormName);
        currentForm.formInstance.reset();
    };
}