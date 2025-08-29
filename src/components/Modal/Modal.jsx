import styled from "styled-components";
import {ModalHeader} from "./ModalHeader.jsx";
import {ModalBody} from "./ModalContent.jsx";

const ModalOverlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;   
    bottom: 0;  
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 10;
    display: flex;             
    justify-content: center;   
    align-items: center;       
`
const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    background-color: #fff;
    gap: 15px;
    padding: 16px 20px;
    border-bottom: 1px solid #CBD5E1;
    z-index: 1000;
`

const ModalButton = styled.button`
    padding: 8px 14px;
    margin-left: auto;
    max-height: 40px;
    width: max-content;
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

    position: relative;
    z-index: 10;
    pointer-events: auto;
`

export const Modal = ({ ModalTitle, ModalButtonText, children, onClose,onSubmit,loading,validateAmount }) => {
    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalHeader ModalTitle={ModalTitle} onPropsClick={onClose}/>

                <ModalBody>{children}</ModalBody>

                {ModalButtonText ? <ModalButton
                    type="button"
                    onClick={() => {
                        console.log('[ModalButton] click');
                        onSubmit && onSubmit();
                    }}
                    disabled={loading || !validateAmount()}
                >
                    {ModalButtonText}
                </ModalButton> : null}
            </ModalContainer>
        </ModalOverlay>
    );
};