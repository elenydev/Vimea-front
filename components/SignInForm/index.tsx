import React from "react";
import { useRouter } from "next/router";
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
import { CHECK_IF_EMAIL_REGEX, DATABASE_URL } from "../../constants";
import { UserCredentials } from "../../infrastructure/interfaces/User/user";
import { handleAuthorization } from "@/../requests/auth/authRequests";
import { ResponseStatus } from "@/../infrastructure/enums/Request/request";

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

  const signIn = handleSubmit(
    async (userCredentials: UserCredentials): Promise<void> => {
      try {
        const query = await handleAuthorization(userCredentials);
        if (query.responseStatus === ResponseStatus.SUCCESS) {
          console.log("logged in"); // success notification
          // router.push("/auth/singIn"); // push for logged in route
        }
        //error notification
      } catch (err) {
        console.log(err); // error notification
      }
    }
  );

  const router = useRouter();

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
