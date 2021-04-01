import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { FormLabel, Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Wrapper,
  Form,
  LoginDiv,
  ErrorSpan,
  Header,
  InputElement,
  CheckBox,
} from "./signUpForm.styles";
import { CHECK_IF_EMAIL_REGEX, DATABASE_URL } from "@/../constants";
import { User } from "@/../infrastructure/interfaces/User/user";
import { handleRegistration } from "@/../requests/auth/authRequests";
import { ResponseStatus } from "@/../infrastructure/enums/Request/request";

const defaultValues = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  avatar: null,
  policy: null,
};

const RegisterForm = (): JSX.Element => {
  const { register, handleSubmit, errors, setError, reset } = useForm({
    defaultValues,
  });
  const router = useRouter();

  const signUp = handleSubmit(
    async (user: User): Promise<void> => {
      try {
        const query = await handleRegistration(user);
        if (query.responseStatus === ResponseStatus.SUCCESS) {
          console.log("created"); // success notification
          router.push("/auth/singIn");
        }
        //error notification
      } catch (err) {
        console.log(err); // error notification
      }
    }
  );

  return (
    <Wrapper>
      <Header>Create an account</Header>

      <Form onSubmit={signUp}>
        <FormLabel>
          <InputElement
            type='text'
            name='firstName'
            placeholder='First Name'
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.firstName && errors.firstName.type === "required" && (
          <ErrorSpan>Please provide a first name</ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type='text'
            name='lastName'
            placeholder='Last Name'
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.lastName && errors.lastName.type === "required" && (
          <ErrorSpan>Please provide a last name</ErrorSpan>
        )}

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

        <input
          ref={register({ required: true })}
          name='avatar'
          type='file'
          accept='.png, .jpg, .jpeg'
          id='avatar'
          className='hidden'
        />
        <label htmlFor='avatar'>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {errors.avatar && errors.avatar.type === "required" && (
          <ErrorSpan>Please provide an avatar</ErrorSpan>
        )}

        <CheckBox>
          You have to accept our
          <Link href='/auth/policy'>
            <ErrorSpan>
              <a>Privacy Policy</a>
            </ErrorSpan>
          </Link>
          <Checkbox name='policy' inputRef={register({ required: true })} />
          {errors.policy && errors.policy.type === "required" && (
            <ErrorSpan>Please accept our privacy policy</ErrorSpan>
          )}
        </CheckBox>
        <label>
          <Button type='submit' variant='contained' color='secondary'>
            Create
          </Button>
        </label>
      </Form>

      <LoginDiv>
        <Link href='/auth/signIn'>
          <a>Back to sign in</a>
        </Link>
      </LoginDiv>
    </Wrapper>
  );
};

export default RegisterForm;
