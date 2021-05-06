import styled from "styled-components";

interface WrapperProps {
  backgroundImage: string;
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 250px;
  max-height: 350px;
  min-width: 200px;
  max-width: 280px;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.padding.sm};
  border-radius: 5px;
  z-index: 0;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url("${({ backgroundImage }: WrapperProps) => backgroundImage}") no-repeat
      center,
    rgba(0, 0, 0, 0.3);
  background-size: cover;
  transition: 0.3s linear;
  

  & > div {
    display: flex;
  }

  ${({ theme }) => theme.mq.md} {
    background: url("${({ backgroundImage }: WrapperProps) => backgroundImage}")
      no-repeat center;
    background-size: cover;

    & > div {
      display: none;
    }

    &:hover {
      transform: translateY(-5%);
      background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.9) 0,
          rgba(0, 0, 0, 0.2) 60%,
          rgba(0, 0, 0, 0.9) 100%
        ),
        url("${({ backgroundImage }: WrapperProps) => backgroundImage}")
          no-repeat center,
        rgba(0, 0, 0, 0.3);
      background-size: cover;
      box-shadow: ${({ theme }) => theme.boxShadow.dark};

      & > div {
        display: flex;
      }
    }
  }
`;

const ContentWrapper = styled.div`
  display: none;
  flex-direction: column;
  max-height: 50%;
  justify-content: space-between;

  & > h3 {
    color: ${({ theme }) => theme.colors.white};
    text-align: right;
  }

  & > label {
    display: flex;
    justify-content: flex-end;
    .MuiButton-root {
      margin-top: ${({ theme }) => theme.padding.lg};
      background-color: ${({ theme }) => theme.colors.crimsonRed};
      font-size: 8px;
      margin-left: auto;
    }
  }
`;

export { Wrapper, ContentWrapper };
