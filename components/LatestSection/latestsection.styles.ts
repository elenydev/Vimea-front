import styled from "styled-components";

interface BackgroundWrapperProps {
  backgroundImage: string;
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;

  .swipper-container {
    padding: 15px;
  }
  .swiper-pagination-bullet {
    background: wheat;
  }

  .swiper-pagination-bullet-active {
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
  }
`;

const BackgroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  padding: ${({ theme }) => theme.padding.lg};
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url("${({ backgroundImage }: BackgroundWrapperProps) => backgroundImage}")
      no-repeat center,
    rgba(0, 0, 0, 0.3);
  background-size: cover;

  ${({ theme }) => theme.mq.md} {
    padding: ${({ theme }) => theme.padding.xlg};
  } ;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10%;
  padding: 10% 10%;
  max-width: 100%;

  ${({ theme }) => theme.mq.md} {
    max-width: 80%;
    padding: 0;
    padding-top: 10%;
  }

  ${({ theme }) => theme.mq.lg} {
    height: 100%;
  }
`;

const MoviesWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  cursor: pointer;
`;

export { Wrapper, BackgroundWrapper, Container, MoviesWrapper };
