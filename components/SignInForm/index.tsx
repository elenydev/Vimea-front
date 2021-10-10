import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { FormLabel, Button } from "@material-ui/core";
import {
  Wrapper,
  Header,
  Form,
  ErrorSpan,
  LoginDiv,
  InputElement,
} from "./signInForm.styles";
import RemindPasswordForm from "components/RemindPasswordForm";
import { CHECK_IF_EMAIL_REGEX } from "constants/index";
import { UserCredentials } from "infrastructure/interfaces/User/user";
import { useSelector } from "react-redux";
import { getUserManager } from "components/User/domain/selectors";
import { Text } from "dictionary/text";
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";
import { getFormManager } from "managers/FormManager/selectors";

const defaultValues = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  avatar: null,
  policy: null,
};

const index = () => {
  const formInstance = useForm({ defaultValues });
  const { register, handleSubmit, errors } = formInstance;
  const userManager = useSelector(getUserManager);
  const formManager = useSelector(getFormManager);
  formManager.setFormInstance({
    formName: FORM_INSTANCE_NAME.AUTHORIZATION,
    formInstance,
  });

  const signIn = handleSubmit((userCredentials: UserCredentials): void => {
    userManager.setUser(userCredentials);
  });

  return (
    <Wrapper>
      <Header>{Text.app.main.forms.labels.sign_in}</Header>

      <Form onSubmit={signIn}>
        <FormLabel>
          <InputElement
            type="text"
            name="email"
            placeholder={Text.app.main.forms.labels.email}
            inputRef={register({
              required: true,
              pattern: {
                value: CHECK_IF_EMAIL_REGEX,
                message: Text.app.main.forms.validationErrors.errors.email,
              },
            })}
          />
        </FormLabel>

        {errors.email && errors.email.type === "required" && (
          <ErrorSpan>
            {Text.app.main.forms.validationErrors.required.email}
          </ErrorSpan>
        )}

        {errors.email && errors.email.type === "pattern" && (
          <ErrorSpan>
            {Text.app.main.forms.validationErrors.pattern.email}
          </ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type="password"
            name="password"
            placeholder="Enter Password"
            inputRef={register({ required: true })}
          />
        </FormLabel>

        {errors.password && errors.password.type === "required" && (
          <ErrorSpan>
            {Text.app.main.forms.validationErrors.required.password}
          </ErrorSpan>
        )}
        <label>
          <Button type="submit" variant="contained" color="secondary">
            {Text.app.main.forms.labels.sign_in}
          </Button>
        </label>

        <LoginDiv>
          <Link href="/auth/signUp">
            <a>{Text.app.main.forms.labels.sign_up}</a>
          </Link>
        </LoginDiv>
      </Form>
      <RemindPasswordForm />
    </Wrapper>
  );
};

export default index;
