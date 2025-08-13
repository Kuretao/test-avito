import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import Input, {PhoneInput} from "../ui/Input.jsx";
import TableNavigation from "../components/MainTable/TableNavigation.jsx";
import {ButtonDefault} from "../ui/Button.jsx";
import OptionTable from "../ui/Option.jsx";
import searchIcon from "../assets/icons/search.svg";


const data = [
    {
        date: "05.02.2024 11:31",
        amount: "29999",
        payoutRequest: [
            {type: "info", label: "1 300 ₽"}
        ],
        transferTo: [
            {type: "success", label: "300 ₽"}
        ],
        status: "Вакансии Крд Петров - акк № 3",
    },
    {
        date: "05.02.2024 11:31",
        amount: "29999",
        payoutRequest: [
            {type: "info", label: "1 300 ₽"}
        ],
        transferTo: [
            {type: "success", label: "300 ₽"}
        ],
        status: "Вакансии Крд Петров - акк № 3",
    },
    {
        date: "05.02.2024 11:31",
        amount: "29999",
        payoutRequest: [
            {type: "info", label: "1 300 ₽"}
        ],
        transferTo: [
            {type: "success", label: "300 ₽"}
        ],
        status: "Вакансии Крд Петров - акк № 3",
    },
    {
        date: "05.02.2024 11:31",
        amount: "29999",
        payoutRequest: [
            {type: "info", label: "1 300 ₽"}
        ],
        transferTo: [
            {type: "success", label: "300 ₽"}
        ],
        status: "Вакансии Крд Петров - акк № 3",
    },
];

const TableContainer = styled.section`
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF;
`

const RefHeader = styled.header`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;

    p {
        font-family: Manrope, sans-serif;
        font-weight: 500;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #475569;

        span {
            font-family: Manrope, sans-serif;
            color: #006999;
        }
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


const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    & > div > * {
        margin: 0;

        & > input {
            border: none;
        }
    }
`;

const SearchButton = styled.div`
    height: 40px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    display: flex;
    align-items: center;
    transition: width 0.3s ease;
    width: ${({$expanded}) => ($expanded ? "390px" : "40px")};
    z-index: 10;
`;

const SearchIcon = styled.img`
    width: 40px;
    height: 40px;
    padding: 8px;
    cursor: pointer;
    object-fit: scale-down;
`;

const AnimatedInput = styled(Input)`
    flex: 1;
    width: ${({$expanded}) => ($expanded ? "100%" : "0px")};
    opacity: ${({$expanded}) => ($expanded ? 1 : 0)};
    transition: opacity 0.1s ease 0.1s;
    border: none;
    background: transparent;

    &:focus {
        outline: none;
    }
`;

const SecondVaribleHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    h2 {
        font-family: Manrope, sans-serif;
        font-weight: 700;
        font-size: 18px;
        leading-trim: NONE;
        line-height: 24px;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #006999;
    }

    p {
        font-family: Manrope, sans-serif;
        font-weight: 500;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 100%;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #64748B;
        width: 70%;
    }
`


function Referrals() {
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [searchShow, setSearchShow] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef(null);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    useEffect(() => {
        if (phone.trim() === "") {
            setPhoneError("Введите номер телефона");
        } else {
            setPhoneError("");
        }
    }, [phone]);

    const [name, setName] = useState("");
    const [addingReferral, setAddingReferral] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpanded(false);
                setSearchShow(true);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
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
            <RefHeader style={{borderBottom: '1px solid #CBD5E1', paddingBottom: '24px'}}>
                {addingReferral ? (
                    <SearchWrapper style={{width: "100%"}}>
                        <SecondVaribleHeader>
                            <h2>Добавление реферала</h2>
                        </SecondVaribleHeader>

                        <div style={{display: "flex", gap: "8px", marginLeft: "auto", alignItems:'end'}}>
                            <PhoneInput value={phone} onChange={setPhone} error={phoneError}/>

                            <div style={{display: "flex", flexDirection: "column", gap: "4px", minWidth: "200px"}}>
                                <label style={{fontSize: "14px", fontWeight: "500", color: "#475569"}}>Укажите имя
                                    клиента *</label>
                                <input
                                    style={{
                                        height: "40px",
                                        borderRadius: "8px",
                                        border: "1px solid #CBD5E1",
                                        padding: "0 8px",
                                        fontSize: "14px",
                                        width:260
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Имя"
                                />
                            </div>

                            <ButtonDefault
                                style={{background: "#006999", height: 'max-content'}}
                                ButtonTitle={"Добавить"}
                            />
                        </div>
                    </SearchWrapper>
                ) : (
                    <>
                        <SearchWrapper>
                            <SearchButton $expanded={expanded} ref={containerRef} onClick={() => setSearchShow(false)}>
                                {searchShow && (
                                    <SearchIcon
                                        src={searchIcon}
                                        alt="Поиск"
                                        onClick={() => setExpanded((prev) => !prev)}
                                    />
                                )}
                                <AnimatedInput
                                    $expanded={expanded}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onSearch={onSearch}
                                    placeholder="Поиск"
                                />
                            </SearchButton>
                            <p>Количество пользователей: <span>114</span></p>
                        </SearchWrapper>
                        <ButtonDefault ButtonTitle={"+ Добавить рефералов"} onClick={() => setAddingReferral(true)}/>
                    </>
                )}
            </RefHeader>
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
                                    <OptionTable style={{background: "#CCEFFF", color: "#006999"}} key={idx}
                                                 type={item.type}>{item.label}</OptionTable>
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