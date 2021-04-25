import React from "react";
import Link from "next/link";
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
import { CHECK_IF_EMAIL_REGEX } from "@/../constants";
import { User } from "@/../infrastructure/interfaces/User/user";
import { useSelector } from "react-redux";
import { getUserManager } from "../App/domain/selectors";
import { Text } from '@/../dictionary/text';

const defaultValues = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  avatar: null,
  policy: null,
};

const RegisterForm = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });
  const userManager = useSelector(getUserManager);

  const signUp = handleSubmit(
    (user: User): void => {
      userManager.registerUser(user);
      reset();
    }
  );

  return (
    <Wrapper>
      <Header>{Text.app.main.forms.labels.create__account}</Header>

      <Form onSubmit={signUp}>
        <FormLabel>
          <InputElement
            type='text'
            name='firstName'
            placeholder={Text.app.main.forms.labels.first__name}
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.firstName && errors.firstName.type === "required" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.first__name}</ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type='text'
            name='lastName'
            placeholder={Text.app.main.forms.labels.last__name}
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.lastName && errors.lastName.type === "required" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.last__name}</ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type='text'
            name='email'
            placeholder={Text.app.main.forms.labels.email}
            inputRef={register({
              required: true,
              pattern: {
                value: CHECK_IF_EMAIL_REGEX,
                message: Text.app.main.forms.validationErrors.errors.email
              },
            })}
          />
        </FormLabel>
        {errors.email && errors.email.type === "required" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.email}</ErrorSpan>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.pattern.email}</ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type='password'
            name='password'
            placeholder={Text.app.main.forms.labels.password}
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.password && errors.password.type === "required" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.password}</ErrorSpan>
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
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.avatar}</ErrorSpan>
        )}

        <CheckBox>
          {Text.app.main.forms.labels.accept__policy}
          <Link href='/auth/policy'>
            <ErrorSpan>
              <a>{Text.app.main.forms.labels.privacy__policy}</a>
            </ErrorSpan>
          </Link>
          <Checkbox name='policy' inputRef={register({ required: true })} />
          {errors.policy && errors.policy.type === "required" && (
            <ErrorSpan>{Text.app.main.forms.validationErrors.required.policy}</ErrorSpan>
          )}
        </CheckBox>
        <label>
          <Button type='submit' variant='contained' color='secondary'>
            {Text.app.main.forms.labels.create}
          </Button>
        </label>
      </Form>

      <LoginDiv>
        <Link href='/auth/signIn'>
          <a>{Text.app.main.forms.labels.back__to__sign__in}</a>
        </Link>
      </LoginDiv>
    </Wrapper>
  );
};

export default RegisterForm;
