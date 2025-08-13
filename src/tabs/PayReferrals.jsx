import styled from "styled-components";
import {ChartsBlock} from "./Register.jsx";
import React, {useMemo, useState} from "react";
import OptionTable from "../ui/Option.jsx";
import TableNavigation from "../components/MainTable/TableNavigation.jsx";
import QustionIcon from "../assets/icons/question-circle.svg";
import {Question} from "../ui/Question.jsx";
import Input from "../ui/Input.jsx";
import peopleIcon from "../assets/icons/user-alt.svg";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const data = [
    {
        date: "05.02.2024 11:31",
        amount: "13212",
        id: 42000,
        items: '10 акк.',
        price: [
            {type: "success", label: "1300 ₽"}
        ],
        status: [
            {type: "success", label: "выплачено"}
        ],
        priceOut: [
            {type: "success", label: "500 ₽"}
        ],
    },
    {
        date: "05.02.2024 11:31",
        amount: "13212",
        id: 42000,
        items: '10 акк.',
        price: [
            {type: "success", label: "1300 ₽"}
        ],
        status: [
            {type: "success", label: "выплачено"}
        ],
        priceOut: [
            {type: "success", label: "500 ₽"}
        ],
    },
    {
        date: "05.02.2024 11:31",
        amount: "13212",
        id: 42000,
        items: '10 акк.',
        price: [
            {type: "success", label: "1300 ₽"}
        ],
        status: [
            {type: "success", label: "выплачено"}
        ],
        priceOut: [
            {type: "success", label: "500 ₽"}
        ],
    },
    {
        date: "05.02.2024 11:31",
        amount: "13212",
        id: 42000,
        items: '10 акк.',
        price: [
            {type: "success", label: "1300 ₽"}
        ],
        status: [
            {type: "success", label: "выплачено"}
        ],
        priceOut: [
            {type: "success", label: "500 ₽"}
        ],
    },
];

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF;
`

const TableWrapper = styled.table`
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

const DateWrapper = styled.span`
    padding: 6px 8px;
    border-radius: 8px;
    background: #E2E8F0;
    font-size: 12px;
`

const registrationsAll = [
    {date: '2024-04-17', count: 1},
    {date: '2024-04-18', count: 1},
    {date: '2024-04-29', count: 1},
    {date: '2024-04-30', count: 1},
    {date: '2024-05-03', count: 2},
    {date: '2024-05-08', count: 1},
];

function prepareChartData(filtered) {
    if (filtered.length === 0) return [];
    const datesMap = new Map(filtered.map(({date, count}) => [date, count]));
    const start = new Date(filtered[0].date);
    const end = new Date(filtered[filtered.length - 1].date);
    const allDates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().slice(0, 10);
        allDates.push({date: iso, registrations: datesMap.get(iso) || 0});
    }
    return allDates;
}

export const PayReferrals = () => {

    const [filter, setFilter] = useState("Всё время");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [customDate, setCustomDate] = useState("");
    const filtered = useMemo(() => {
        let result = registrationsAll;
        const today = new Date();

        if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);
            return result.filter((r) => {
                const current = new Date(r.date);
                return current >= start && current <= end;
            });
        }

        switch (filter) {
            case "Сегодня":
                return registrationsAll.filter(
                    (r) => r.date === today.toISOString().slice(0, 10)
                );
            case "Вчера":
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return registrationsAll.filter(
                    (r) => r.date === yesterday.toISOString().slice(0, 10)
                );
            case "Неделя":
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                return registrationsAll.filter(
                    (r) => new Date(r.date) >= weekAgo
                );
            case "Месяц":
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                return registrationsAll.filter(
                    (r) => new Date(r.date) >= monthAgo
                );
            case "Год":
                const yearAgo = new Date(today);
                yearAgo.setFullYear(today.getFullYear() - 1);
                return registrationsAll.filter(
                    (r) => new Date(r.date) >= yearAgo
                );
            case "Всё время":
            default:
                return registrationsAll;
        }
    }, [filter, dateRange]);

    const chartData = useMemo(() => prepareChartData(filtered), [filtered]);

    const onFilterClick = value => {
        setFilter(value);
        setCustomDate("");
    };

    const onDateChange = e => {
        setCustomDate(e.target.value);
        setFilter("");
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const filteredData = data.filter(
        (item) =>
            item.date.includes(searchTerm) ||
            item.amount.includes(searchTerm) ||
            (item.transferTo?.includes(searchTerm)) ||
            item.id.toString().includes(searchTerm)
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const [show, setShow] = useState(false);

    return (
        <Wrapper>
            <ChartsBlock
                chartData={chartData}
                setFilter={setFilter}
                setDateRange={setDateRange}
                onDateChange={onDateChange}
                customDate={customDate}
                filter={filter}
                onFilterClick={onFilterClick}
            >
                    <Input
                        placeholder="ID реферала"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{maxWidth: 206}}
                        icon={<img src={peopleIcon} alt="icon"/>}
                    />
            </ChartsBlock>
            <TableContainer>
                <TableWrapper>
                    <TableHead>
                        <tr>
                            <th>Дата</th>
                            <th>ID рефералов</th>
                            <th>ID оплаченной услуги</th>
                            <th style={{display:"flex", gap: 8, position:'relative'}}>Покупки <img style={{cursor:'pointer'}} src={QustionIcon} onClick={() => setShow(!show)} alt="QustionIcon"/>{show && <Question style={{marginTop:6, transform: 'translateX(-25%)'}} QuestionText={'Название и категория услуги'} QuestionTitle={'Подробнее в разделе «Правила»'}/> }</th>
                            <th>Цена</th>
                            <th>Статус</th>
                            <th>Вознаграждение</th>
                        </tr>
                    </TableHead>
                    <tbody>
                    {filteredData.map((item, idx) => (
                        <Tr key={idx}>
                            <Td><DateWrapper>{item.date}</DateWrapper></Td>
                            <Td>{item.amount}</Td>
                            <Td>{item.id}</Td>
                            <Td>{item.items}</Td>
                            <Td>
                                <PayoutContainer >
                                    {item.price.map((item, idx) => (
                                        <OptionTable style={{background: "#CCEFFF",color:"#006999"}} key={idx} type={item.type}>{item.label}</OptionTable>
                                    ))}
                                </PayoutContainer>
                            </Td>
                            <Td>
                                <PayoutContainer>
                                    {item.status.map((item, idx) => (
                                        <OptionTable style={{background: "#FFE396",color:"#475569"}} key={idx} type={item.type}>{item.label}</OptionTable>
                                    ))}
                                </PayoutContainer>
                            </Td>
                            <Td>
                                <PayoutContainer >
                                    {item.priceOut.map((item, idx) => (
                                        <OptionTable style={{background: "#FFE396",color:"#475569"}} key={idx} type={item.type}>{item.label}</OptionTable>
                                    ))}
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
                    totalRecords={filteredData.length}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />
            </TableContainer>
        </Wrapper>
    )
}