import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Table from "./Table";
import TableNavigation from "./TableNavigation";
import Input from "./../../ui/Input";
import {getPartnerData} from "../../api/apiMetods.js";
import Cookies from "js-cookie";

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
        const cached = Cookies.get("payoutsData");
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed)) {
                    setData(parsed);
                    setLoading(false);
                    console.log("Данные из cookie загружены", parsed);
                }
            } catch (e) {
                console.error("Ошибка парсинга куки:", e);
            }
        }

        // 2. Обновляем с API
        getPartnerData()
            .then((res) => {
                const payouts = res?.data?.partner_data?.payouts || [];
                if (!Array.isArray(payouts)) {
                    console.warn("payouts не массив", payouts);
                    return;
                }

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
                }));

                setData(formatted);
                const simpleFormatted = formatted.map(({date, amount, transferTo, status, payoutRequest}) => ({
                    date, amount, transferTo, status, payoutRequest: payoutRequest || []
                }));


                if (typeof window !== "undefined") {
                    Cookies.set("payoutsData", JSON.stringify(simpleFormatted), { expires: 1 });
                }

                Cookies.set("payoutsData", JSON.stringify(formatted), { expires: 1 });
                console.log("Данные сохранены в cookie", formatted);
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
