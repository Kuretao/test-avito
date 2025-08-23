import React, {useState, useMemo} from "react";
import styled from "styled-components";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush, Area, AreaChart
} from "recharts";
import copyIcon from "../assets/icons/copy.svg";
import {DateRangeInput} from "../ui/Date.jsx";
import {useData} from "../DataProvider/DataProvider.jsx";


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
    background-color: #fff;

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

            img {
                border-radius: 50%;
                object-fit: scale-down;
                width: 32px;
                height: 32px;
            }

            img:hover {
                background-color: #0069991F;
                filter: invert(28%) sepia(94%) saturate(1376%) hue-rotate(169deg) brightness(93%) contrast(97%);
            }
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
        margin-bottom: 0;

        img {
            border-radius: 50%;
            object-fit: scale-down;
            width: 32px;
            height: 32px;
        }

        img:hover {
            background-color: #0069991F;
            filter: invert(28%) sepia(94%) saturate(1376%) hue-rotate(169deg) brightness(93%) contrast(97%);
        }
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
    background-color: #fff;
`
const Chart = styled.div` /* ... */ `;
const RegBlock = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px 0 #00466626;
    background-color: #fff;
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


// с бэка приходят данные вот так

// {,…}
// partner_data
//     :
// {NAME: "ИП", RQ_ACC_NUM: "40802810900008456717", RQ_BANK_NAME: "АО "ТБанк"", RQ_BIK: "044525974",…}
// payToReferral
//     :
//     [{date: "05.06.2023", id_pay: 116165, id_ref: 21093, name_ref: "Евгений", reward: "1200.00",…},…]
// referral_stats
//     :
// {referral: [{name: "Евгений", referral_id: "21093", total_amount: 4500, total_reward: 1800},…],…}
// referral
//     :
//     [{name: "Евгений", referral_id: "21093", total_amount: 4500, total_reward: 1800},…]
// stats_by_date
//     :
// {2023-08-14: 2, 2023-08-16: 1, 2023-08-22: 1, 2023-09-05: 1, 2023-09-09: 1, 2023-10-09: 2,…}
// 2023-08-14
// :
// 2
// 2023-08-16
// :
// 1
// 2023-08-22
// :
// 1
// 2023-09-05
// :
// 1
// 2023-09-09
// :
// 1
// 2023-10-09
// :
// 2
// 2023-10-22
// :
// 1

// нам нужно это stats_by_date



function prepareChartData(filtered) {
    if (filtered.length === 0) return [];
    const datesMap = new Map(filtered.map(({ date, count }) => [date, count]));
    const start = new Date(filtered[0].date);
    const end = new Date(filtered[filtered.length - 1].date);
    const allDates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().slice(0, 10);
        allDates.push({
            date: iso,
            registrations: Number(datesMap.get(iso) || 0),
        });
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

export const RegistrationsChart = ({data}) => {
    console.log(typeof data[0]?.registrations);

    console.log("Chart data:", data);
    return (
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data} margin={{top: 15, right: 10, left: 0, bottom: 15}}>
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3791e2" stopOpacity={0.4}/>
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
                    stroke="#3791e2"
                    strokeWidth={2}
                    fill="url(#colorGradient)"
                    dot={{r: 4, stroke: '#fff', strokeWidth: 2, fill: '#3791e2'}}
                    activeDot={{r: 6}}
                />

                <Brush
                    dataKey="date"
                    height={26}
                    stroke="#3791e2"
                    travellerWidth={15}
                    fill="#f8fafc"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}


export const ChartsBlock = ({ chartData,dateRange, filter, setFilter, setDateRange, children }) => {


    return (
        <ChartBlock>
            <Filters>
                {["Сегодня", "Вчера", "Неделя", "Месяц", "Год", "Всё время"].map(
                    (value) => (
                        <FilterButton
                            key={value}
                            className={filter === value ? "active" : ""}
                            onClick={() => {
                                setFilter(value);
                                setDateRange({ start: "", end: "" });
                            }}
                        >
                            {value}
                        </FilterButton>
                    )
                )}
                <DateRangeInput
                    value={dateRange}
                    onChange={({ start, end }) => {
                        setDateRange({ start, end });
                        setFilter("");
                    }}
                />
                {children}
            </Filters>
            <RegistrationsChart data={chartData} />
        </ChartBlock>
    );
};


const ReferralComponent = () => {
    const { data, loading, error } = useData();
    const [filter, setFilter] = useState("Всё время");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p>Ошибка загрузки данных: {error.message || error.toString()}</p>;

    const registrationsAll = useMemo(() => {
        const stats = data?.referral_stats?.stats_by_date || {};
        return Object.entries(stats)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [data]);

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
            case "Вчера": {
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return registrationsAll.filter(
                    (r) => r.date === yesterday.toISOString().slice(0, 10)
                );
            }
            case "Неделя": {
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                return registrationsAll.filter((r) => new Date(r.date) >= weekAgo);
            }
            case "Месяц": {
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                return registrationsAll.filter((r) => new Date(r.date) >= monthAgo);
            }
            case "Год": {
                const yearAgo = new Date(today);
                yearAgo.setFullYear(today.getFullYear() - 1);
                return registrationsAll.filter((r) => new Date(r.date) >= yearAgo);
            }
            case "Всё время":
            default:
                return registrationsAll;
        }
    }, [filter, dateRange, registrationsAll]);

    const chartData = useMemo(() => prepareChartData(filtered), [filtered]);

    const totalRegistrations = chartData.reduce(
        (sum, item) => sum + item.registrations,
        0
    );

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (
        <Wrapper>

            <LinkBlock>
                <Title>Реферальная ссылка</Title>
                <span>
                  С презентацией платформы:
                  <a
                      // href="https://monitoring.b2b-help.ru/partners/?i=27335"
                      target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 16,
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontFamily: 'Manrope,sans-serif',
                  }} onClick={() => handleCopy("https://monitoring.b2b-help.ru/partners/?i=27335")}>
                    https://monitoring.b2b-help.ru/partners/?i=27335 <img src={copyIcon} alt="copy"/>
                  </a>
                </span>
                <span>
                  Прямая ссылка на регистрацию:{" "}
                    <a
                        // href="https://monitoring.b2b-help.ru/login.php/?i=27335"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontFamily: 'Manrope,sans-serif',
                        }}
                        onClick={() => handleCopy("https://monitoring.b2b-help.ru/login.php/?i=27335")}
                    >
                    https://monitoring.b2b-help.ru/login.php/?i=27335 <img src={copyIcon} alt="copy"/>
                  </a>
                </span>
                <Promo onClick={() => handleCopy("257042")}>
                    Промо для Ваших рефералов: <span style={{cursor: 'pointer', fontWeight: 700}}>257042 <img src={copyIcon} alt="copy"/></span>
                </Promo>
            </LinkBlock>
            <ChartsBlock
                chartData={chartData}
                filter={filter}
                setFilter={setFilter}
                setDateRange={setDateRange}
            />

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
