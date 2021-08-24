import styled from "styled-components";

export const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  img {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }

  ${({ theme }) => theme.mq.md} {
    width: 75px;
    height: 75px;
  }

  input {
    display: none;
  }

  label {
    position: absolute;
    bottom: 3px;
    right: 3px;

    span {
      padding: 0;
      color: ${({ theme }) => theme.colors.darkRed};
    }
  }
`;
