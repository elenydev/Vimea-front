import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.1;
  filter: brightness(100%);
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;

  ${({ theme }) => theme.mq.xl} {
    padding: 40px;
  }
`;

export const UpcomingAnhor = styled.div`
  & > a {
    padding: 16px 42px;
    box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
    line-height: 1.25;
    background: ${({ theme }) => theme.colors.crimsonRed};
    text-decoration: none;
    border-radius: 15px;
    color: white;
    font-size: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    position: relative;
    transition: background-color 0.6s ease;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: 50%;
      left: 50%;
      transform-style: flat;
      transform: translate3d(-50%, -50%, 0);
      background: rgba(white, 0.1);
      border-radius: 100%;
      transition: width 0.3s ease, height 0.3s ease;
    }
    &:focus,
    &:hover {
      background: ${({ theme }) => theme.colors.darkRed};
    }
    &:active {
      &:after {
        width: 200px;
        height: 200px;
      }
    }
  }
`;
