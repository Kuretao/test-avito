import closeIcon from "../../assets/icons/CloseIcon.svg";
import styled from "styled-components";

const ModalHead = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    h3{
        font-family: Manrope,sans-serif;
        font-weight: 600;
        font-size: 24px;
        leading-trim: NONE;
        line-height: 24px;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #006999;
    }
`

export const ModalHeader = ({ModalTitle, onPropsClick}) => (
    <ModalHead>
        <h3>{ModalTitle}</h3>
        <img src={closeIcon} style={{width: 22, height: 22}} alt="close" onClick={onPropsClick}/>
    </ModalHead>
)