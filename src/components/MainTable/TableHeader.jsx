import React from "react";
import styled from "styled-components";

const TableHead = styled.thead`
    border-bottom: 1px solid #94A3BB;
    height: max-content;
    &>tr>th{
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        vertical-align: middle;
        color: #475569;

        padding-bottom: 16px;
        text-align: left;
    }
`

export default function TableHeader() {
    return (
        <TableHead>
            <tr >
                <th >Дата</th>
                <th >Сумма</th>
                <th >Запрос на выплату</th>
                <th >Куда перевести</th>
                <th >Статус</th>
            </tr>
        </TableHead>
    );
}
