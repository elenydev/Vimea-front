import styled from "styled-components";

const Wrapper = styled.div`
display: flex;
flex-direction: column;
text-align: right;
width: 100%;
color: ${({ theme }) => theme.colors.white};
padding-bottom: 40px;
box-sizing: border-box;

${({ theme }) => theme.mq.md} {
    width: 70%;
}

${({ theme }) => theme.mq.lg} {
    width: 60%;
}
${({ theme }) => theme.mq.xlg}{
    width: 50%;

}

& > label > .MuiButton-root {
    margin-top: ${({ theme }) => theme.padding.sm};
    background-color:${({ theme }) => theme.colors.crimsonRed};
    font-size: ${({ theme }) => theme.font.size.xxs};
}
`;

const Heading = styled.h2`
font-size: ${({ theme }) => theme.font.size.sm};
padding-bottom: ${({ theme }) => theme.padding.sm};

${({ theme }) => theme.mq.md} {
    font-size: ${({ theme }) => theme.font.size.lg};
}
`;

const SubHeading = styled.h3`
font-size: ${({ theme }) => theme.font.size.xxs};

${({ theme }) => theme.mq.md} {
    font-size: ${({ theme }) => theme.font.size.xs};
}
`;

const RatingWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
`

export { Wrapper, Heading, SubHeading, RatingWrapper }