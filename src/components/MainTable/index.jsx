import React, { useState} from "react";
import styled from "styled-components";
import Table from "./Table";
import TableNavigation from "./TableNavigation";
import Input from "./../../ui/Input";
import {useData} from "../../DataProvider/DataProvider.jsx";

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF;
`

export default function Index() {
    const { data, loading, error } = useData();

    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    if (loading) return <p>Загрузка выплат...</p>;
    if (error) return <p>Ошибка загрузки данных: {error.message || error.toString()}</p>;

    if (!data?.partner_data?.payouts) return <p>Нет данных о выплатах</p>;

    const payouts = data.partner_data.payouts;

    const formatted = payouts.map((p) => ({
        date: p.dateTime,
        amount: `${p.amount} ₽`,
        payoutRequest: [
            {
                type: p.requestStatus === "закрыта" ? "success" : "info",
                label: p.request || "—",
            },
        ],
        transferTo: p.destination || "—",
        status: p.requestStatus || "—",
    })).sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredData = formatted.filter(
        (item) =>
            item.date?.includes(searchTerm) ||
            item.amount?.includes(searchTerm) ||
            item.transferTo?.includes(searchTerm)
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
