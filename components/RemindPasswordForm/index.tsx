import React from "react";
import { useForm } from "react-hook-form";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FormLabel, Button } from "@material-ui/core";
import {
  LoginDiv,
  InputElement,
  ErrorSpan,
  Form,
} from "./remindPasswordForm.styles";
import { CHECK_IF_EMAIL_REGEX } from "@/../constants";
import { useSelector } from "react-redux";
import { getUserManager } from "@/../components/App/domain/selectors";
import {Text} from '@/../dictionary/text';

const defaultValues: { email: string } = {
  email: null,
};

const index = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });
  const userManager = useSelector(getUserManager);

  const remindPassword = handleSubmit(
    (value: { email: string }): void => {
      userManager.remindPassword(value.email);
      reset()
    }
  );

  return (
    <LoginDiv>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          {Text.app.main.forms.labels.remind_password}
        </AccordionSummary>

        <AccordionDetails>
          <Form onSubmit={remindPassword}>
            <FormLabel>
              <InputElement
                type='text'
                name='email'
                placeholder='Enter email'
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
              <ErrorSpan>{Text.app.main.forms.validationErrors.required.email}</ErrorSpan>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <ErrorSpan>{Text.app.main.forms.validationErrors.pattern.email}</ErrorSpan>
            )}
            <label>
              <Button type='submit' variant='contained' color='secondary'>
                {Text.app.main.forms.labels.remind}
              </Button>
            </label>
          </Form>
        </AccordionDetails>
      </Accordion>
    </LoginDiv>
  );
};

export default index;
