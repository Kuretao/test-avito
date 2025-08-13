import styled from "styled-components";
import {RequisitesRow} from "./RequisiteRow.jsx";


const OrganizationData = [
    { title: "Название организации", value: "Имя" },
    { title: "ФИО", value: "Имя Фамилия Отчество" },
    { title: "Юридический статус", value: "ИП" },
    { title: "ИНН", value: "987974165168" },
    { title: "Email", value: "mail@mail.ru" },
    { title: "Телефон", value: "+7 (987) 654-32-10" },
    { title: "Система налогообложения", value: "без НДС" },
    { title: "БИК", value: "974165168" },
    { title: "Название банка", value: "Россельхоз банк" },
    { title: "Корреспондентский счет", value: "987 89 741 6 5168 0000000" },
    { title: "Расчетный счет", value: "98789741651689878974" },
    { title: "Есть презентация на платформе", value: true },
    { title: "Прямая ссылка на регистрацию", value: true },
    { title: <span>Реферальный промокод: <span style={{marginLeft:28, fontWeight: 700}}>257042</span></span>, value: "257042" },
];


const RequisitesContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 #00466626;
    background: #FFFFFF;
    
    &>*{
        font-family: "Manrope", sans-serif;
    }
`

const RequisitesTitle = styled.h1`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #006999;
`

const RequisitesContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    
    &>hr{
        display: block;
        width: 1px;
        min-height: 100%;
        border: none;
        background-color: #CBD5E1;
    }
`

const RequisitesColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.5;
    gap: 4px;
`

const firstColumnData = OrganizationData.slice(0, OrganizationData.length - 3);
const secondColumnData = OrganizationData.slice(-3);

function Requisites() {
    return (
        <RequisitesContainer>
            <RequisitesTitle>Реквизиты организации</RequisitesTitle>

            <RequisitesContent>
                <RequisitesColumn>
                    {firstColumnData.map(({ title, value }, index) => (
                        <RequisitesRow key={index} title={title} value={value} />
                    ))}
                </RequisitesColumn>
                <hr/>
                <RequisitesColumn style={{marginLeft:32}}>
                    {secondColumnData.map(({ title, value }, index) => (
                        <RequisitesRow key={index} title={title} value={value} />
                    ))}
                </RequisitesColumn>
            </RequisitesContent>
        </RequisitesContainer>
    )
}

export default Requisites;