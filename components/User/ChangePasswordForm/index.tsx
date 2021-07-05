import React from "react";
import { useForm } from "react-hook-form";

import { FormLabel, Button } from "@material-ui/core";
import {
  InputElement,
  ErrorSpan,
  Form,
  Header,
} from "./changePasswordForm.styles";
import { useSelector } from "react-redux";
import { getUserManager } from "@/../components/App/domain/selectors";
import { Text } from "@/../dictionary/text";
import { ChangePasswordUserCredentials } from "@/../infrastructure/interfaces/User/user";
import { getNotificationManager } from "@/../components/Notifications/domain/selectors";
import { FORM_INSTANCE_NAME } from "@/../infrastructure/enums/Form/form";
import { getFormManager } from "@/../managers/FormManager/selectors";

const defaultValues: ChangePasswordUserCredentials = {
  password: null,
  newPassword: null,
  newPasswordConfirmation: null,
};

const index = (): JSX.Element => {
  const formInstance = useForm({ defaultValues });
  const { register, handleSubmit, errors } = formInstance;
  const userManager = useSelector(getUserManager);
  const formManager = useSelector(getFormManager);
  formManager.setFormInstance({ formName: FORM_INSTANCE_NAME.CHANGE_PASSWORD, formInstance });

  const changePassword = handleSubmit(
    (credentials: ChangePasswordUserCredentials): void => {
      userManager.changePassword(credentials);
    }
  );



  return (
    <Form onSubmit={changePassword}>
      <Header>{Text.app.main.forms.labels.change_password}</Header>
      <FormLabel>
        <InputElement
          type="password"
          name="password"
          placeholder={Text.app.main.forms.labels.current_password}
          inputRef={register({ required: true })}
        />
      </FormLabel>
      {errors.password && errors.password.type === "required" && (
        <ErrorSpan>
          {Text.app.main.forms.validationErrors.required.current_password}
        </ErrorSpan>
      )}

      <FormLabel>
        <InputElement
          type="password"
          name="newPassword"
          placeholder={Text.app.main.forms.labels.new_password}
          inputRef={register({ required: true })}
        />
      </FormLabel>
      {errors.newPassword && errors.newPassword.type === "required" && (
        <ErrorSpan>
          {Text.app.main.forms.validationErrors.required.new_password}
        </ErrorSpan>
      )}
      <FormLabel>
        <InputElement
          type="password"
          name="newPasswordConfirmation"
          placeholder={Text.app.main.forms.labels.confirm_new_password}
          inputRef={register({ required: true })}
        />
      </FormLabel>
      {errors.newPasswordConfirmation &&
        errors.newPasswordConfirmation.type === "required" && (
          <ErrorSpan>
            {Text.app.main.forms.validationErrors.required.confirm_new_password}
          </ErrorSpan>
        )}
      <label>
        <Button type="submit" variant="contained" color="secondary">
          {Text.app.main.forms.labels.change}
        </Button>
      </label>
    </Form>
  );
};

export default index;
