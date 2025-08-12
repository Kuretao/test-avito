import styled from "styled-components";

const QuestionContainer = styled.div`
    position: absolute;
    top: 16px;
    left: 0;
    
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background: #004666;
    border-radius: 8px;
    width: max-content;
    max-width: 298px;

    &>*{
        font-family: Manrope,sans-serif;
        font-weight: 500;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #fff;
    }
    
    z-index: 100;
`

export const Question = ({QuestionTitle, QuestionText, style}) => {
    return (
        <QuestionContainer style={style}>
            <span>{QuestionTitle}</span>
            <p>{QuestionText}</p>
        </QuestionContainer>
    )
}