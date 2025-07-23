import styled from "styled-components";
import link from "../../assets/icons/link 2.svg"

const RequisiteRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    min-height: 18px;
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

function ReqValue({ value }) {
    if (value === true) {
        return <a href={value}><img style={{width:18, height:18}} src={link} alt=""/></a>;
    }
    if (value || value === 0) {
        return value;
    }
    return "-";
}

export const RequisitesRow = ({title,value,index}) => {
    return (
        <RequisiteRow key={index}>
            <RequisiteRowTitle>{title}</RequisiteRowTitle>
            <RequisiteRowContent>{ReqValue({ value })}</RequisiteRowContent>
        </RequisiteRow>
    )
}