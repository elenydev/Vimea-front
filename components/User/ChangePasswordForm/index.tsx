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

const defaultValues: ChangePasswordUserCredentials = {
  password: null,
  newPassword: null,
  newPasswordConfirmation: null,
};

const index = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });
  const userManager = useSelector(getUserManager);
  const notificationManager = useSelector(getNotificationManager);

  const changePassword = handleSubmit(
    (credentials: ChangePasswordUserCredentials): void => {
      const { newPassword, newPasswordConfirmation } = credentials;

      if (newPassword !== newPasswordConfirmation) {
        notificationManager.setErrorNotifications(
          Text.app.main.forms.validationErrors.errors.confirm_new_password
        );
        return;
      }
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
