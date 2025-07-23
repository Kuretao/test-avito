import React from "react";
import styled from "styled-components";
import Dropdown from "../../ui/Dropdown.jsx";

const Tr = styled.tr`
  border-bottom: 1px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 12px 10px;
  font-size: 14px;
  color: #334155;
  vertical-align: middle;
`;

const PayoutContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export default function TableRow({ row }) {
    return (
        <Tr>
            <Td>{row.date}</Td>
            <Td>{row.amount}</Td>
            <Td>
                <PayoutContainer>
                    {row.payoutRequest.map((item, idx) => (
                        <Dropdown key={idx} type={item.type}>{item.label}</Dropdown>
                    ))}
                </PayoutContainer>
            </Td>
            <Td>{row.transferTo}</Td>
            <Td>
                <Dropdown type="success">{row.status}</Dropdown>
            </Td>
        </Tr>
    );
}
