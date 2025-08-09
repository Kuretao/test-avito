import styled from "styled-components";
import React, {useState} from "react";
import Input from "../ui/Input.jsx";
import TableNavigation from "../components/MainTable/TableNavigation.jsx";
import {ButtonDefault} from "../ui/Button.jsx";
import OptionTable from "../ui/Option.jsx";


const data = [
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            {type: "info", label: "выплачено ранее (обновление партнерской программы)"}
        ],
        transferTo: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        status: "выплачено",
    },
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        transferTo: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        status: "выплачено",
    },
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        transferTo: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        status: "выплачено",
    },
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        transferTo: [
            {type: "success", label: "перевод на банковскую карту"}
        ],
        status: "выплачено",
    },
];

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF80;
`

const RefHeader = styled.header`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;

    span {
        font-family: Raleway,sans-serif;
        font-weight: 500;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #006999;
    }
`
const TableWrapper = styled.table`
    margin-top: 16px;
    border-collapse: collapse;
    width: 100%;
`;

const TableHead = styled.thead`
    border-bottom: 1px solid #94A3BB;
    height: max-content;

    & > tr > th {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        vertical-align: middle;
        color: #475569;

        padding-bottom: 16px;
        text-align: left;
    }
`

const Tr = styled.tr`
    &:last-child {
        border-bottom: 1px solid #94A3BB;

        & > td {
            padding-bottom: 16px;
        }
    }

    &:first-child {
        & > td {
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


function Referrals() {
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const filteredData = data.filter(
        (item) =>
            item.date.includes(searchTerm) ||
            item.amount.includes(searchTerm) ||
            item.transferTo.includes(searchTerm)
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pagedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const onSearch = () => {
        setPage(1);
        setSearchTerm(inputValue);
    };

    return (
        <TableContainer>
            <RefHeader>
                <span>Количество пользователей: 114</span>
                <ButtonDefault ButtonTitle={"Добавить рефералов"}/>
            </RefHeader>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={onSearch}
                placeholder="Поиск"
            />
            <TableWrapper>
                <TableHead>
                    <tr>
                        <th>Дата и время регистрации</th>
                        <th>ID рефералов</th>
                        <th>Сумма покупок</th>
                        <th>Сумма вознаграждений</th>
                        <th>Имя</th>
                    </tr>
                </TableHead>
                <tbody>
                {data.map((item, idx) => (
                    <Tr key={idx}>
                        <Td>{item.date}</Td>
                        <Td>{item.amount}</Td>
                        <Td>
                            <PayoutContainer>
                                {item.payoutRequest.map((item, idx) => (
                                    <OptionTable key={idx} type={item.type}>{item.label}</OptionTable>
                                ))}
                            </PayoutContainer>
                        </Td>
                        <Td>
                            <PayoutContainer>
                                {item.transferTo.map((item, idx) => (
                                    <OptionTable key={idx} type={item.type}>{item.label}</OptionTable>
                                ))}
                            </PayoutContainer>
                        </Td>
                        <Td>
                            {item.status}
                        </Td>
                    </Tr>
                ))}
                </tbody>
            </TableWrapper>
            <TableNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                totalRecords={filteredData.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </TableContainer>
    )
}

export default Referrals;