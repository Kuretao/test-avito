import React from "react";
import styled from "styled-components";
import OptionTable from "../../ui/Option.jsx";


const Tr = styled.tr`
  &:last-child{
      border-bottom: 1px solid #94A3BB;
      
      &>td{
          padding-bottom: 16px;
      }
  }
    
    &:first-child{
        &>td{
            padding-top: 16px;
        } 
    }
`;

const Td = styled.td`
    padding: 4px 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    color: #64748B;
`;

const PayoutContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export default function TableRow({ row }) {
    function formatNumber(value) {
        if (value == null) return "";

        const num = Number(String(value).replace(/[^\d.-]/g, ""));
        if (isNaN(num)) return value;

        return new Intl.NumberFormat("ru-RU").format(num);
    }
    return (
        <Tr>
            <Td>{row.date}</Td>
            <Td>{formatNumber(row.amount)} ₽</Td>
            <Td>
                <PayoutContainer>
                    {(row.payoutRequest || []).map((item, idx) => (
                        <OptionTable key={idx} type={item.type}>
                            {item.label}
                        </OptionTable>
                    ))}
                </PayoutContainer>

            </Td>
            <Td>{row.transferTo}</Td>
            <Td>
                <OptionTable type="success"  style={{backgroundColor: row.status === 'открыта' ? '#E2E8F0' : '#C8E49D'}} >{row.status}</OptionTable>
            </Td>
        </Tr>
    );
}
