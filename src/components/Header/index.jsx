import styled from "styled-components";
import { HeaderDataItem } from "./HeaderData.jsx";
import { ButtonDefault } from "../../ui/Button.jsx";
import { useState } from "react";
import api from "../../api/apiAxios.js";
import {useData} from "../../DataProvider/DataProvider.jsx";
import {sendAgreement} from "../../api/apiMetods.js";

const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px 0 #00466626;
`;

const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    max-height: 55px;

    & > div:first-child > div:last-child {
        color: #006999;
    }
`;

const HeaderLeftSide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const HeaderCheckbox = styled.input`
    display: none;

    &:checked + span {
        background: #00AFFF;
        border-color: #00AFFF;
    }

    &:checked + span::after {
        opacity: 1;
    }
`;

const CustomCheckbox = styled.span`
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 2px solid #94A3BB;
    background: #fff;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;

    &::after {
        content: '';
        position: absolute;
        left: 3px;
        top: 1px;
        width: 6px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: opacity 0.2s ease;
    }
`;

const HeaderCheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: Manrope, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: #475569;
    cursor: pointer;
    white-space: nowrap;

    a {
        color: #006999;
        display: inline;
        white-space: pre-line;
    }
`;

function IndexHeader() {
    const { data, loading, error } = useData();

    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState(false);

    if (loading) return <p>Загрузка данных...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;

    const partner = data?.partner_data || {};

    function formatNumber(num) {
        if (num == null || isNaN(num)) return "";
        return new Intl.NumberFormat("ru-RU").format(num);
    }
    const dynamicData = [
        {
            id: 1,
            title: 'Баланс на счете',
            question: true,
            value: `${formatNumber(partner.current_balance) ?? 0} руб.`,
        },
        { id: 2, title: 'Группа 1', question: false, value: <>40 %</> },
        { id: 3, title: 'Группа 2', question: false, value: <>20 %</> },
        { id: 4, title: 'Группа 3', question: false, value: <>10 %</> },
        { id: 5, title: 'Группа 4', question: false, value: <>5 %</> },
    ];



    const handleContinueClick = async () => {
        if (checked) {
            try {
                const response = await sendAgreement();
                console.log("Соглашение подтверждено:", response.data);
                window.location.reload();
            } catch (err) {
                console.error("Ошибка при подтверждении соглашения:", err);
            }
        }
    };

    return (
        <Header>
            <HeaderContent>
                {dynamicData.map((item) => (
                    <HeaderDataItem
                        key={item.id}
                        index={item.id}
                        title={item.title}
                        question={item.question}
                        value={item.value}
                    />
                ))}
            </HeaderContent>

            <HeaderLeftSide>
                {show && (
                    <HeaderCheckboxLabel htmlFor="agree">
                        <HeaderCheckbox
                            type="checkbox"
                            id="agree"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <CustomCheckbox />
                        <span>
                            Ознакомлен с{" "}
                            <a
                                href="https://b2b-help.ru/individual_partnership_agreement/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                индивидуальным <br /> партнёрским соглашением
                            </a>
                        </span>
                    </HeaderCheckboxLabel>
                )}

                <ButtonDefault
                    ButtonTitle={show ? "Продолжить" : "Запрос на выплату"}
                    onClick={() => {
                        if (!show) {
                            setShow(true);
                        } else {
                            handleContinueClick();
                        }
                    }}
                    disabled={show && !checked}
                />
            </HeaderLeftSide>
        </Header>
    );
}

export default IndexHeader;
