import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Table from "./Table";
import TableNavigation from "./TableNavigation";
import Input from "./../../ui/Input";
import {getPartnerData} from "../../api/apiMetods.js";

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF;
`

export default function Index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    useEffect(() => {
        getPartnerData()
            .then((res) => {
                const payouts = res.data.partner_data.payouts || [];

                const formatted = payouts.map((p) => ({
                    date: p.dateTime,
                    amount: `${p.amount} ₽`,
                    payoutRequest: [
                        {
                            type: p.requestStatus === "закрыта" ? "success" : "info",
                            label: p.request || "—"
                        }
                    ],
                    transferTo: p.destination || "—",
                    status: p.requestStatus || "—"
                }));

                setData(formatted);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке выплат:", err);
                setError("Не удалось загрузить данные");
            })
            .finally(() => setLoading(false));
    }, []);
    const filteredData = data.filter(
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

    if (loading) return <p>Загрузка выплат...</p>;
    if (error) return <p>{error}</p>;
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
