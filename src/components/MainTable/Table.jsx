import React from "react";
import styled from "styled-components";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const TableContainer = styled.table`
  margin-top: 16px;
  border-collapse: collapse;
  width: 100%;
`;

export default function Table({ data }) {
    return (
        <TableContainer>
            <TableHeader />
            <tbody>
            {data.map((item, idx) => (
                <TableRow key={idx} row={item} />
            ))}
            </tbody>
        </TableContainer>
    );
}
