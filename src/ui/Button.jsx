import styled from "styled-components";


const Button = styled.button`
    color: white;
    background-color: #00AFFF;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    text-align: center;
    padding: 8px 14px;
    border-radius: 8px;
    font-family: "Manrope", sans-serif;

    &:disabled {
        background: #E2E8F0!important; 
        cursor: not-allowed;
    }
`

export const ButtonDefault = ({ButtonTitle, onClick, style,disabled}) => {
    return (
        <Button style={style} disabled={disabled} onClick={onClick}>{ButtonTitle}</Button>
    )
}