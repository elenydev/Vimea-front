import styled from "styled-components";
import Input from "@material-ui/core/Input";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  min-width: 35vw;
  max-width: 500px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  & > label > .MuiButton-containedSecondary {
    margin: 15px;
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
  & > .hidden {
    display: none;
  }
  & > label > .MuiIconButton-colorPrimary {
    color: ${({ theme }) => theme.colors.lightOrange} !important;
  }
`;

export const LoginDiv = styled.div`
  text-align: center;
  margin: 5px 0;
  transition: 0.3s ease-in-out;
  position: relative;
  cursor: pointer;
`;

export const ErrorSpan = styled.span`
  color: ${({ theme }) => theme.colors.lightRed};
  font-size: 12px;
`;

export const Header = styled.h2`
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const InputElement = styled(Input)`
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.white};
  & > .MuiInputBase-input {
    color: ${({ theme }) => theme.colors.white};
  }
`;
