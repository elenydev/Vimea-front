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
import RemindPasswordForm from "@/../components/RemindPasswordForm";
import { CHECK_IF_EMAIL_REGEX } from "../../constants";
import { UserCredentials } from "../../infrastructure/interfaces/User/user";
import { useSelector } from "react-redux";
import { getUserManager } from "../App/domain/selectors";

const defaultValues = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  avatar: null,
  policy: null,
};

const index = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });
  const userManager = useSelector(getUserManager);

  const signIn = handleSubmit(
    (userCredentials: UserCredentials): void => {
      userManager.setUser(userCredentials);
    }
  );

  return (
    <Wrapper>
      <Header>Sign in</Header>

      <Form onSubmit={signIn}>
        <FormLabel>
          <InputElement
            type='text'
            name='email'
            placeholder='Enter email'
            inputRef={register({
              required: true,
              pattern: {
                value: CHECK_IF_EMAIL_REGEX,
                message: "invalid email address",
              },
            })}
          />
        </FormLabel>

        {errors.email && errors.email.type === "required" && (
          <ErrorSpan>Please provide a email</ErrorSpan>
        )}

        {errors.email && errors.email.type === "pattern" && (
          <ErrorSpan>Please provide a correct email</ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type='password'
            name='password'
            placeholder='Enter Password'
            inputRef={register({ required: true })}
          />
        </FormLabel>

        {errors.password && errors.password.type === "required" && (
          <ErrorSpan>Please provide a password</ErrorSpan>
        )}
        <label>
          <Button type='submit' variant='contained' color='secondary'>
            Sign in
          </Button>
        </label>

        <LoginDiv>
          <Link href='/auth/signUp'>
            <a>Sign Up</a>
          </Link>
        </LoginDiv>
      </Form>
      <RemindPasswordForm />
    </Wrapper>
  );
};

export default index;
