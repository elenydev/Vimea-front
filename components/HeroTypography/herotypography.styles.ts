import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  max-width: 700px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 60px;
  padding-top: 15%;

  ${({ theme }) => theme.mq.md} {
    margin-bottom: 80px;
    padding-top: 10%;
  }
`;

export const MainHeading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.lg};
  padding-bottom: 10px;

  ${({ theme }) => theme.mq.lg} {
    font-size: ${({ theme }) => theme.font.size.xlg};
  }
`;

export const SubHeading = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.light};
  font-size: ${({ theme }) => theme.font.size.xs};

  ${({ theme }) => theme.mq.lg} {
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;
