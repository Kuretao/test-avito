import styled from "styled-components";


const ModalBodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const ModalBody = ({children}) => (
    <ModalBodyContainer>
        {children}
    </ModalBodyContainer>
)