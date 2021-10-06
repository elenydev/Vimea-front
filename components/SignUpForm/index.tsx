import React, { ChangeEvent, useState } from "react";
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
  ImagePreviewBox,
} from "./signUpForm.styles";
import { CHECK_IF_EMAIL_REGEX } from "contants";
import { User } from "infrastructure/interfaces/User/user";
import { useSelector } from "react-redux";
import { getUserManager } from "components/User/domain/selectors";
import { Text } from 'dictionary/text';
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

const RegisterForm = (): JSX.Element => {
  const formInstance = useForm({ defaultValues });
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, errors } = formInstance;
  const userManager = useSelector(getUserManager);
  const formManager = useSelector(getFormManager);
  formManager.setFormInstance({ formName: FORM_INSTANCE_NAME.REGISTRATION, formInstance });

  const signUp = handleSubmit(
    (user: User): void => {
      userManager.registerUser(user);
    }
  );
  
  const setCurrentImagePreview = (event: ChangeEvent<HTMLInputElement>) => {
    const filesArray = ((event as unknown as Event).target as HTMLInputElement).files;
    if(Boolean(filesArray.length)) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      }
      fileReader.readAsDataURL(filesArray[0]);
    }
  }

  return (
    <Wrapper>
      <Header>{Text.app.main.forms.labels.create_account}</Header>

      <Form onSubmit={signUp}>
        <FormLabel>
          <InputElement
            type='text'
            name='firstName'
            placeholder={Text.app.main.forms.labels.first_name}
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.firstName && errors.firstName.type === "required" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.first_name}</ErrorSpan>
        )}

        <FormLabel>
          <InputElement
            type='text'
            name='lastName'
            placeholder={Text.app.main.forms.labels.last_name}
            inputRef={register({ required: true })}
          />
        </FormLabel>
        {errors.lastName && errors.lastName.type === "required" && (
          <ErrorSpan>{Text.app.main.forms.validationErrors.required.last_name}</ErrorSpan>
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
        {imagePreview && 
        <ImagePreviewBox >
          <img src={imagePreview} />
        </ImagePreviewBox>
        } 
        <input
          ref={register({ required: true })}
          name='avatar'
          type='file'
          accept='.png, .jpg, .jpeg'
          id='avatar'
          className='hidden'
          onChange={setCurrentImagePreview}
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
          {Text.app.main.forms.labels.accept_policy}
          <Link href='/auth/policy'>
            <ErrorSpan>
              <a>{Text.app.main.forms.labels.privacy_policy}</a>
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
          <a>{Text.app.main.forms.labels.back_to_sign_in}</a>
        </Link>
      </LoginDiv>
    </Wrapper>
  );
};

export default RegisterForm;
