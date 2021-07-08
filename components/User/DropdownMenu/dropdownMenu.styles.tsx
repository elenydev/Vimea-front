import styled from "styled-components";

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  max-width: 350px;

  & > li {
    display: flex;
    box-sizing: border-box;
    flex: 1;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.size.xxs};
    padding: ${({ theme }) => theme.padding.sm}
      ${({ theme }) => theme.padding.lg};
    transition: 0.2s ease linear;

    &:hover {
      text-shadow: 0 0 1.5px ${({ theme }) => theme.colors.white};
    }
  }
`;
