import styled from "styled-components";

interface NavigationWrapperProps {
  isVisible: boolean;
  transformHeight: number;
}

export const NavigationWrapper = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  top: 0;
  z-index: 99;
  width: 100%;
  left: 50%;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url("/images/backgroundImage.jpg") no-repeat center;
  background-size: cover;
  right: 50%;
  height: 100vh;
  transform: translate(
    100%,
    ${(props: NavigationWrapperProps) =>
      props.isVisible ? "0px" : -props.transformHeight + "px"}
  );
  transition: 0.3s 0.1s ease-in-out;

  ${({ theme }) => theme.mq.md} {
    transform: translate(
      -50%,
      ${(props: NavigationWrapperProps) =>
        props.isVisible ? "0px" : -props.transformHeight + "px"}
    );
    height: fit-content;
    background: transparent;
    background-image: none;
  }

  &.active {
    transform: translate(
      -50%,
      ${(props: NavigationWrapperProps) =>
        props.isVisible ? "0px" : -props.transformHeight + "px"}
    ) !important;
  }
`;

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  margin: 0 auto;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  z-index: 99;
  height: 100%;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.white};
  div,
  ul,
  li {
    width: 100%;
    text-align: center;
  }
  ${({ theme }) => theme.mq.md} {
    flex-wrap: nowrap;
    width: 80%;
    div,
    ul,
    li {
      width: fit-content;
      text-align: center;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & > li {
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: 1.1em;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.2s all linear;

    &:hover,
    :focus {
      color: ${({ theme }) => theme.colors.crimsonRed};
      transform: translateY(-5px);
    }
  }

  ${({ theme }) => theme.mq.md} {
    flex-direction: row;
    width: 80%;
    height: 100%;

    & > li {
      margin: 0 20px;
      font-size: ${({ theme }) => theme.font.size.sm};
    }
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mq.md} {
    flex-direction: row;
  }
`;

export const Hamburger = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  display: inline-block;
  cursor: pointer;
  background-color: transparent;
  z-index: 100;
  border: 0;
  margin: 0;
  transform: translate(
    0%,
    ${(props: NavigationWrapperProps) =>
      props.isVisible ? "0px" : -props.transformHeight + "px"}
  );
  transition: 0.3s 0.1s ease-in-out;
  &:hover,
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.bittersweet};
  }

  ${({ theme }) => theme.mq.md} {
    display: none;
  }
`;

export const HamburgerBox = styled.span`
  width: 35px;
  height: 24px;
  display: inline-block;
  position: relative;
`;

export const HamburgerInner = styled.span`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.1s 0.2s ease-in-out;

  &:before {
    content: "";
    left: 0;
    transition: transform 0.2s 0.2s ease-in-out;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.white};
    position: absolute;
  }

  &:after {
    content: "";
    left: 0;
    transition: transform 0.2s 0.2s ease-in-out;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.white};
    position: absolute;
  }

  &:before {
    top: -10px;
  }

  &:after {
    top: 10px;
  }

  &.hamburger--active {
    background-color: transparent;

    &:after {
      transform: translateY(-10px) rotate(-45deg);
    }

    &:before {
      transform: translateY(10px) rotate(45deg);
    }
  }
`;

export const ArrowButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 120;
  cursor: pointer;
  & > .MuiIcon-root {
  }
`;
