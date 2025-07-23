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
`

export const ButtonDefault = ({ButtonTitle}) => {
    return (
        <Button>{ButtonTitle}</Button>
    )
}