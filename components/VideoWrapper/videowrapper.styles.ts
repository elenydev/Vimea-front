import styled from 'styled-components';

export const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);

  & > iframe {
    width: 80%;
    height: 50%;
  }
`;