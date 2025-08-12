import styled from "styled-components";
import {ModalHeader} from "./ModalHeader.jsx";
import {ModalBody} from "./ModalContent.jsx";

const ModalOverlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
`
const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background-color: #fff;
    gap: 15px;
    padding: 16px 20px;
    border-bottom: 1px solid #CBD5E1;
`

const ModalButton = styled.button`
    width: 100%;
    border-radius: 6px;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 16px;
    leading-trim: NONE;
    line-height: 24px;
    letter-spacing: 0;
    text-align: center;
    color: #fff;
    background-color: #006999;
`

export const Modal = ({ModalTitle,ModalButtonText}) =>{
    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader ModalTitle={ModalTitle}/>

                <ModalBody/>

                <ModalButton>{ModalButtonText}</ModalButton>
            </ModalContainer>
        </ModalOverlay>
    )
}