import styled from "styled-components";
import { ChartsBlock } from "./Register.jsx";
import React, { useMemo, useState } from "react";import OptionTable from "../ui/Option.jsx";
import TableNavigation from "../components/MainTable/TableNavigation.jsx";
import QustionIcon from "../assets/icons/question-circle.svg";
import { Question } from "../ui/Question.jsx";
import Input from "../ui/Input.jsx";
import peopleIcon from "../assets/icons/user-alt.svg";
import { getPartnerData } from "../api/apiMetods.js";
import {useData} from "../DataProvider/DataProvider.jsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF;
`;

const TableWrapper = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const TableHead = styled.thead`
    border-bottom: 1px solid #94A3BB;

    & > tr > th {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        vertical-align: middle;
        color: #475569;
        padding-bottom: 16px;
        text-align: left;
    }
`;

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

const DateWrapper = styled.span`
    padding: 4.5px 8px;
    border-radius: 8px;
    background: #E2E8F0;
    font-size: 12px;
    height: 26px;
    line-height: 100%;
`;

function prepareChartData(filtered) {
    return filtered.map(({ date, count }) => ({
        date,
        registrations: Number(count),
    }));
}

export const PayReferrals = () => {
    const { data, loading, error } = useData();

    const [filter, setFilter] = useState("Всё время");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [show, setShow] = useState(false);

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p>Ошибка загрузки данных: {error.message || error.toString()}</p>;

    const rawData = data?.payToReferral || [];

    const registrations = rawData.map((p) => {
        const [day, month, year] = p.date.split(".");
        return {
            date: `${year}-${month}-${day}`,
            count: 1,
            id_ref: p.id_ref,
            id_pay: p.id_pay,
            name_ref: p.name_ref,
            sum_pay: p.sum_pay,
            status: p.status,
            reward: p.reward,
        };
    });
    function formatNumber(num) {
        if (num == null || isNaN(num)) return "";
        return new Intl.NumberFormat("ru-RU").format(num);
    }
    const filtered = useMemo(() => {
        let result = [...registrations];
        const today = new Date();
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(
                (r) =>
                    r.id_ref.toString().includes(searchTerm) ||
                    r.id_pay.toString().includes(searchTerm) ||
                    (r.name_ref?.toLowerCase().includes(lower))
            );
        }

        if (startDate && endDate) {
            result = result.filter((r) => {
                const d = new Date(r.date);
                return d >= startDate && d <= endDate;
            });
        } else {
            switch (filter) {
                case "Сегодня": {
                    const todayStr = today.toISOString().slice(0, 10);
                    result = result.filter((r) => r.date === todayStr);
                    break;
                }
                case "Вчера": {
                    const yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    const str = yesterday.toISOString().slice(0, 10);
                    result = result.filter((r) => r.date === str);
                    break;
                }
                case "Неделя": {
                    const weekAgo = new Date(today);
                    weekAgo.setDate(today.getDate() - 7);
                    result = result.filter((r) => new Date(r.date) >= weekAgo);
                    break;
                }
                case "Месяц": {
                    const monthAgo = new Date(today);
                    monthAgo.setMonth(today.getMonth() - 1);
                    result = result.filter((r) => new Date(r.date) >= monthAgo);
                    break;
                }
                case "Год":
                case "Всё время": {
                    break;
                }
            }
        }

        return result;
    }, [filter, dateRange, registrations, searchTerm]);

    const chartData = useMemo(() => prepareChartData(filtered), [filtered]);

    const pagedData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filtered.slice(start, end);
    }, [filtered, page, itemsPerPage]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <Wrapper>
            <ChartsBlock
                chartData={chartData}
                filter={filter}
                setFilter={setFilter}
                setDateRange={setDateRange}
                dateRange={dateRange}
            >
                <Input
                    placeholder="ID реферала"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: 206 }}
                    icon={<img src={peopleIcon} alt="icon" />}
                />
            </ChartsBlock>

            <TableContainer>
                <TableWrapper>
                    <TableHead>
                        <tr>
                            <th>Дата</th>
                            <th>ID рефералов</th>
                            <th>ID оплаченной услуги</th>
                            <th style={{display: "flex", gap: 8, position: "relative"}}>
                                Покупки{" "}
                                <img
                                    style={{cursor: "pointer"}}
                                    src={QustionIcon}
                                    onClick={() => setShow(!show)}
                                    alt="QustionIcon"
                                />
                                {show && (
                                    <Question
                                        style={{marginTop: 6, transform: "translateX(-25%)"}}
                                        QuestionText={"Название и категория услуги"}
                                        QuestionTitle={"Подробнее в разделе «Правила»"}
                                    />
                                )}
                            </th>
                            <th>Цена</th>
                            <th>Статус</th>
                            <th>Вознаграждение</th>
                        </tr>
                    </TableHead>
                    <tbody>
                    {pagedData.map((item, idx) => (
                        <Tr key={idx}>
                            <Td><DateWrapper>{item.date}</DateWrapper></Td>
                            <Td>{item.id_ref}</Td>
                            <Td>{item.id_pay}</Td>
                            <Td>{item.name_ref}</Td>
                            <Td>
                                <PayoutContainer>
                                    <OptionTable
                                        style={{background: "#CCEFFF", color: "#006999"}}>{formatNumber(item.sum_pay)} ₽</OptionTable>
                                </PayoutContainer>
                            </Td>
                            <Td>
                                <PayoutContainer>
                                    <OptionTable
                                        style={{
                                            backgroundColor: item.status === 'Начислено' ? '#C8E49D' : '#FFE396',
                                            color: "#475569"}}>{item.status}</OptionTable>
                                </PayoutContainer>
                            </Td>
                            <Td>
                                <PayoutContainer>
                                    <OptionTable
                                        style={{backgroundColor: item.status === 'Начислено' ? '#C8E49D' : '#FFE396', color: "#475569"}}>{formatNumber(item.reward)} ₽</OptionTable>
                                </PayoutContainer>
                            </Td>
                        </Tr>
                    ))}
                    </tbody>
                </TableWrapper>
                <TableNavigation
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    totalRecords={filtered.length}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />
            </TableContainer>
        </Wrapper>
    );
};
