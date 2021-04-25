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
padding-top: 40%;

${({ theme }) => theme.mq.md} {
    max-width: 80%;
    padding-top: 25%;
}
`

const MoviesWrapper = styled.div`
display: grid;
width: 100%;
align-items: center;
grid-template-columns: repeat(auto-fit, 200px);
grid-template-rows: repeat(auto-fit, 250px);
grid-gap: 30px;


${({ theme }) => theme.mq.md} {
    grid-gap: 50px;
}
`


export { Wrapper, BackgroundWrapper, Container, MoviesWrapper }
