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
import { CHECK_IF_EMAIL_REGEX } from "constants";
import { useSelector } from "react-redux";
import { getUserManager } from "components/User/domain/selectors";
import { Text } from 'dictionary/text';
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";
import { getFormManager } from "managers/FormManager/selectors";

const defaultValues: { email: string } = {
  email: null,
};

const index = (): JSX.Element => {
  const formInstance = useForm({ defaultValues });
  const { register, handleSubmit, errors } = formInstance;
  const userManager = useSelector(getUserManager);
  const formManager = useSelector(getFormManager);
  formManager.setFormInstance({ formName: FORM_INSTANCE_NAME.REMIND_PASSWORD, formInstance });

  const remindPassword = handleSubmit(
    (value: { email: string }): void => {
      userManager.remindPassword(value.email);
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
