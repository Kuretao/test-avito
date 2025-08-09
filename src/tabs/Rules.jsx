import styled from "styled-components";
import warningIcon from "./../assets/icons/info-circle.svg"
import {useState} from "react";
import arrow from "./../assets/icons/arrow.svg"

const WarningContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 10px;
    border-radius: 8px;
    padding: 14px;
    border-top: 2px solid #FF8E92;
    background: #FFECEC;

    & > * {
        color: #9C2529;
    }

    p {
        font-family: Manrope,sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
    }
`

const RulesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`

const RulesTitle = styled.h1`
    font-family: Manrope,sans-serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    text-transform: uppercase;

    color: #006999;
`

const FaqList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #CBD5E1;
    overflow: hidden;
`;

const FaqItem = styled.div`
    border-bottom: 1px solid #CBD5E1;
    
    &:last-child {
        border-bottom: none;  
    }
`;

const FaqQuestion = styled.button`
    padding: 12px;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    text-align: left;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        color: #0c4765;
    }
`;

const FaqIcon = styled.span`
    font-weight: bold;
    font-size: 22px;
    margin-left: 12px;
    transition: transform 0.15s;
    transform: ${({open}) => (open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const FaqAnswer = styled.div`
    border-left: 4px solid #006999;
    padding: 16px;
    padding-left: 20px;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0;
    color: #475569;
    background: #008CCC14;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
`;

const faqs = [
    {
        question: "Кому подходит партнерская программа?",
        answer: "Ведете трех и более клиентов как \"Авитолог\" или Вы хороший продавец и хотите работать на себя? Тогда это точно Вам подходит."
    },
    {
        question: "Какой процент по партнерке?",
        answer: "Размер партнерского вознаграждения устанавливается индивидуально и зависит от условий вашей программы."
    },
    {
        question: "Как получить партнерское вознаграждение?",
        answer: "Партнёрское вознаграждение выплачивается по запросу через личный кабинет платформы. За каждую покупку вашего реферала вы получаете начисление на 31й день после покупки.\n" +
            "Все начисления суммируются и отображаются в реферальной программе, для вывода партнёрского вознаграждения на банковскую карту необходимо выполнить 3 условия:\n" +
            "Минимум 3 ваших реферала пользуются сервисом (?)\n" +
            "Сумма к выводу не менее 5000 рублей\n" +
            "У вас нет открытых заявок на вывод средств\n" +
            "Кнопка «Запрос на выплату» активна в период с 1 по 10 число каждого месяца, при соблюдении Партнёром указанных выше условий. Срок выплаты вознаграждения: с 13-го по 20-ое число месяца, следующего за Отчётный периодом."
    },
    {
        question: "Где будет происходить учет моих клиентов?",
        answer: "В Вашем личном кабинете партнера"
    },
    {
        question: "Как я буду привязывать клиента к себе?",
        answer: "У Вас будет персональная реферальная ссылка, по которой Вы будете регистрировать Вашего клиента."
    },
    {
        question: "Зачем клиенту регистрироваться по моей реферальной ссылке?",
        answer: "У Вас будет персональная реферальная ссылка, по которой Вы будете регистрировать Вашего клиента."
    },
    {
        question: "Какой средний чек?",
        answer: "Средний чек по тарифам платформы 5000 руб/мес., Ваша комиссия от этой суммы составит 2000 руб."
    }
];

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <FaqList>
            {faqs.map((item, idx) => (
                <FaqItem key={idx}>
                    <FaqQuestion
                        aria-expanded={openIdx === idx}
                        onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    >
                        {item.question}
                        <FaqIcon open={openIdx === idx}><img src={arrow} alt="arrow"/></FaqIcon>
                    </FaqQuestion>
                    {openIdx === idx && <FaqAnswer>{item.answer}</FaqAnswer>}
                </FaqItem>
            ))}
        </FaqList>
    );
};

export const Rules = () => {
    return (
        <RulesContainer>
            <WarningContainer>
                <img src={warningIcon} alt="warning"/>
                <p>
                    В случае нарушения правил партнерской программы, рефералы будут откреплены. <br/><br/>
                    Если администрация B2BHELP посчитает поведение партнеров порочащим честь платформы, то она имеет
                    право
                    аннулировать партнерские отчисления и открепить рефералов.<br/><br/>
                    Администрация B2BHELP имеет право пересматривать правила партнерской программы в одностороннем
                    порядке.
                </p>
            </WarningContainer>

            <RulesTitle>Частые вопросы</RulesTitle>

            <FAQ/>
        </RulesContainer>
    )

}