import styled from "styled-components";


const ModalBodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const ModalBody = () => (
    <ModalBody>
        {children}
    </ModalBody>
)