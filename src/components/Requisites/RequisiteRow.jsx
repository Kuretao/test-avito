import styled from "styled-components";

const RequisiteRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8px;
`

const RequisiteRowTitle = styled.h3`
    font-family: "Manrope", sans-serif;
    font-weight: 600;
    font-size: 13px;
    line-height: 100%;
    color: #64748B;
`

const RequisiteRowContent = styled.span`
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    font-size: 13px;
    line-height: 100%;
    color: #64748B;
`

export const RequisitesRow = ({title,value,index}) => {
    return (
        <RequisiteRow key={index}>
            <RequisiteRowTitle>{title}</RequisiteRowTitle>
            <RequisiteRowContent>{value}</RequisiteRowContent>
        </RequisiteRow>
    )
}