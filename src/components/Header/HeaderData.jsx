import styled from "styled-components";

const DataItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-left: 1px solid #94A3BB;
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



export const HeaderDataItem = ({title, question, value, id}) =>{
    return (
        <DataItem key={id}>
            <DataItemTitle>{title} {title ? <p>s</p> : ''}</DataItemTitle>
            <DataItemContent>{question ? <p>ss</p> : ''} {value}</DataItemContent>
        </DataItem>
    )
}