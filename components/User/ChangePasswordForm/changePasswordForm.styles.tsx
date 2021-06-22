import styled from "styled-components";
import Input from "@material-ui/core/Input";

export const Header = styled.h2`
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({theme}) => theme.padding.lg};
  margin: ${({theme}) => theme.spacing.lg};
`;

export const InputElement = styled(Input)`
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.white};
  & > .MuiInputBase-input {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ErrorSpan = styled.span`
  color: ${({ theme }) => theme.colors.bittersweet};
  font-size: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: ${({ theme }) => theme.padding.xlg};
  box-shadow: rgb(0 0 0 / 60%) 2px 2px 8px 0px;
  & > label > .MuiButton-containedSecondary {
    margin: 15px;
    width: fit-content;
    background-color: ${({ theme }) => theme.colors.darkRed};
    &:hover {
      background-color: ${({ theme }) => theme.colors.crimsonRed};
    }
  }

  & > .MuiFormLabel-root {
    color: ${({ theme }) => theme.colors.white};

    & > .MuiInput-underline:after {
      border-bottom: 2px solid ${({ theme }) => theme.colors.darkRed};
    }
  }
`;
