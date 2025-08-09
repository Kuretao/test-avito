import React, {useState, useMemo} from "react";
import styled from "styled-components";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush, Area
} from "recharts";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const Title = styled.div`
    font-family: Manrope, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    color: #006999;
    margin-bottom: 16px;
`;
const LinkBlock = styled.div`
    position: relative;
    box-shadow: 0 2px 8px 0 #00466626;
    padding: 20px;
    border-radius: 8px;

    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        font-family: Manrope, sans-serif;
        font-weight: 500;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #64748B;
        margin-bottom: 6px;

        a {
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            font-variant-numeric-figure: lining-nums;
            font-variant-numeric-spacing: proportional-nums;
            text-decoration: underline;
            text-decoration-style: solid;
            text-decoration-offset: 0;
            text-decoration-thickness: 0;
            color: #00AFFF;
        }
    }
`;
const Promo = styled.div`
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    font-family: Manrope, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    color: #64748B;

    span {
        margin-bottom: 0
    }
`;
const Filters = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;

    input {
        padding: 8px 16px;
        border: 1px solid #CBD5E1;
        border-radius: 8px;

        font-family: Manrope, sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0;
        min-width: 200px;

        height: 40px;
    }
`;
const FilterButton = styled.button`
    padding: 8px 14px;
    height: 40px;
    font-family: Manrope, sans-serif;
    font-weight: 500;
    font-size: 15px;
    border-radius: 8px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: center;
    color: #006999;
    border: 1px solid #00699980;

    &.active {
        background: #006999;
        color: #fff;
    }
`;
const ChartBlock = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px 0 #00466626;
    gap: 16px;
`
const Chart = styled.div` /* ... */ `;
const RegBlock = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px 0 #00466626;
    gap: 16px;
`;
const RegTitle = styled.div`
    font-family: Manrope, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    color: #006999;
`;
const RegList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const RegItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-family: Manrope, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    color: #64748B;

    span {
        padding: 6px 8px;
        border-radius: 8px;
        background: #E2E8F0;

        font-family: Manrope, sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        text-align: center;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;

        color: #64748B;
    }
`;


const registrationsAll = [
    {date: '2024-04-17', count: 6},
    {date: '2024-04-18', count: 12},
    {date: '2024-04-29', count: 14},
    {date: '2024-04-30', count: 15},
    {date: '2024-05-03', count: 22},
    {date: '2024-05-08', count: 11},
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


const StyledTooltip = styled.div`
    background: #f7fafc;
    padding: 8px 15px;
    border-radius: 8px;
    font-size: 15px;
    color: #305793;
    box-shadow: 0 3px 14px #ddebff30;
`;
const CustomTooltip = ({active, payload, label}) =>
    active && payload && payload.length ? (
        <StyledTooltip>
            {label}: <b>{payload[0].value}</b> регистраций
        </StyledTooltip>
    ) : null;

export const RegistrationsChart = ({data}) => (
    <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{top: 15, right: 10, left: 0, bottom: 15}}>

            <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3791e2" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#3791e2" stopOpacity={0}/>
                </linearGradient>
            </defs>

            <CartesianGrid stroke="#eaf2fb" strokeDasharray="3 3"/>
            <XAxis dataKey="date" fontSize={13} tick={{fill: '#b0b8c6'}}/>
            <YAxis fontSize={13} tick={{fill: '#b0b8c6'}} width={40}/>
            <Tooltip content={<CustomTooltip/>}/>

            <Area
                type="monotone"
                dataKey="registrations"
                stroke="none"
                fill="url(#colorGradient)"
                fillOpacity={1}
            />

            <Line
                type="monotone"
                dataKey="registrations"
                stroke="#3791e2"
                strokeWidth={2}
                dot={{r: 4, stroke: '#fff', strokeWidth: 2, fill: '#3791e2'}}
                activeDot={{r: 6}}
            />
            <Brush dataKey="date" height={26} stroke="#3791e2" travellerWidth={15} fill="#f8fafc"/>
        </LineChart>
    </ResponsiveContainer>
);

export const ChartsBlock = ({chartData, filter, customDate, onDateChange, onFilterClick}) => {
    return (
        <ChartBlock>
            <Filters>
                {["Сегодня", "Вчера", "Неделя", "Месяц", "Год", "Всё время", "Placeholder"].map(value => (
                    <FilterButton
                        key={value}
                        className={filter === value ? "active" : ""}
                        onClick={() => onFilterClick(value)}
                    >
                        {value}
                    </FilterButton>
                ))}
                <input
                    type="date"
                    value={customDate}
                    onChange={onDateChange}
                />
            </Filters>
            <Chart>
                <RegistrationsChart data={chartData}/>
            </Chart>
        </ChartBlock>
    );
}


const ReferralComponent = () => {
    const [filter, setFilter] = useState("Всё время");
    const [customDate, setCustomDate] = useState("");


    const filtered = useMemo(() => {
        const today = new Date();
        switch (filter) {
            case "Сегодня":
                return registrationsAll.filter(r => r.date === today.toISOString().slice(0, 10));
            case "Вчера":
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return registrationsAll.filter(r => r.date === yesterday.toISOString().slice(0, 10));
            case "Неделя":
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                return registrationsAll.filter(r => new Date(r.date) >= weekAgo);
            case "Месяц":
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                return registrationsAll.filter(r => new Date(r.date) >= monthAgo);
            case "Год":
                const yearAgo = new Date(today);
                yearAgo.setFullYear(today.getFullYear() - 1);
                return registrationsAll.filter(r => new Date(r.date) >= yearAgo);
            case "Всё время":
            case "Placeholder":
                return registrationsAll;
            default:
                return registrationsAll;
        }
    }, [filter]);


    const onFilterClick = value => {
        setFilter(value);
        setCustomDate("");
    };

    const onDateChange = e => {
        setCustomDate(e.target.value);
        setFilter("");
    };


    const chartData = useMemo(() => {
        if (customDate) {
            return prepareChartData(registrationsAll.filter(r => r.date === customDate));
        }
        return prepareChartData(filtered);
    }, [filtered, customDate]);

    const totalRegistrations = chartData.reduce((sum, item) => sum + item.registrations, 0);

    return (
        <Wrapper>

            <LinkBlock>
                <Title>Реферальная ссылка</Title>
                <span>
                  С презентацией платформы:
                  <a href="https://monitoring.b2b-help.ru/partners/?i=27335" target="_blank" rel="noopener noreferrer">
                    https://monitoring.b2b-help.ru/partners/?i=27335
                  </a>
                </span>
                <span>
                  Прямая ссылка на регистрацию:{" "}
                    <a href="https://monitoring.b2b-help.ru/login.php/?i=27335" target="_blank"
                       rel="noopener noreferrer">
                    https://monitoring.b2b-help.ru/login.php/?i=27335
                  </a>
                </span>
                <Promo>
                    Промо для Ваших рефералов: <span>257042</span>
                </Promo>
            </LinkBlock>
            <ChartsBlock chartData={chartData} filter={filter} customDate={customDate} onDateChange={onDateChange}
                         onFilterClick={onFilterClick}/>
            <RegBlock>
                <RegTitle>Количество регистраций: {totalRegistrations}</RegTitle>
                <RegList>
                    {chartData.map(item => (
                        <RegItem key={item.date}>
                            <span>{item.date}</span> – {item.registrations} человек(а)
                        </RegItem>
                    ))}
                </RegList>
            </RegBlock>
        </Wrapper>
    );
};

export default ReferralComponent;
