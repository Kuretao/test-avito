import React, { useState } from "react";
import styled from "styled-components";
import Table from "./Table";
import TableNavigation from "./TableNavigation";
import Input from "./../../ui/Input";


const data = [
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            { type: "info", label: "выплачено ранее (обновление партнерской программы)" }
        ],
        transferTo: "2202206254381556",
        status: "выплачено",
    },
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            { type: "success", label: "перевод на банковскую карту" }
        ],
        transferTo: "8202206254381556",
        status: "выплачено",
    },
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            { type: "success", label: "перевод на банковскую карту" }
        ],
        transferTo: "8202206254381556",
        status: "выплачено",
    },
    {
        date: "05.02.2024 11:31",
        amount: "59 440 ₽",
        payoutRequest: [
            { type: "success", label: "перевод на банковскую карту" }
        ],
        transferTo: "8202206254381556",
        status: "выплачено",
    },
];

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF80;
`

export default function Index() {
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
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={onSearch}
                placeholder="Поиск"
            />
            <Table data={pagedData} />
            <TableNavigation
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                totalRecords={filteredData.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </TableContainer>
    );
}
