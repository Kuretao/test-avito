import styled from "styled-components";
import QustionIcon from "../../assets/icons/question-circle.svg";
import Money from "../../assets/icons/Group.svg";

const DataItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-left: 1px solid #94A3BB;
    padding: 0 15px;
    
    &:first-child {
        border-left: none;
    }
`

const DataItemTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: #64748B;
    
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
`

const DataItemContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    color: #006999;
    
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
`



export const HeaderDataItem = ({title, question, value, index}) =>{
    return (
        <DataItem key={index}>
            <DataItemTitle>{title} {question ? <img src={QustionIcon} alt="QustionIcon"/> : ''}</DataItemTitle>
            <DataItemContent>{question ? <img src={Money} alt="Money"/> : ''} {value}</DataItemContent>
        </DataItem>
    )
}