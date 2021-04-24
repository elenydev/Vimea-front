import styled from "styled-components";

interface BackgroundWrapperProps {
    backgroundImage: string
}

const Wrapper = styled.div`
display: flex;
min-height: 100vh;
`

const BackgroundWrapper = styled.div`
display: flex;
justify-content: center;
min-height: 100vh;
min-width: 100vw;
padding: ${({ theme }) => theme.padding.lg};
background: 
linear-gradient( to top, rgba(0,0,0,0.9) 0, rgba(0,0,0, 0.2) 60%, rgba(0,0,0,0.9) 100% ), 
url("${({ backgroundImage }: BackgroundWrapperProps) => backgroundImage}") no-repeat center,
rgba(0,0,0,0.3);
background-size: cover;

${({ theme }) => theme.mq.md} {
    padding: ${({ theme }) => theme.padding.xlg};
};

`

const Container = styled.div`
display: flex;
flex: 1;
flex-direction: column;
justify-content: center;
align-items: flex-end;

${({ theme }) => theme.mq.md} {
    max-width: 80%;
}
`

export { Wrapper, BackgroundWrapper, Container }
