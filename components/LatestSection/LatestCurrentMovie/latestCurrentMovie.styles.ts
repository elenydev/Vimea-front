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
.MuiButton-contained:hover.Mui-disabled {
      background-color: ${({ theme }) => theme.colors.crimsonRed};
      color: rgba(0, 0, 0, 0.26);
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
display: -webkit-box;
font-size: ${({ theme }) => theme.font.size.xxs};
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;  
overflow: hidden;

${({ theme }) => theme.mq.md} {
    -webkit-line-clamp: 2;
    font-size: ${({ theme }) => theme.font.size.xs};
}
`;

const RatingWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
`

export { Wrapper, Heading, SubHeading, RatingWrapper }