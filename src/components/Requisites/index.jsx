import styled from "styled-components";
import {RequisitesRow} from "./RequisiteRow.jsx";
import {useData} from "../../DataProvider/DataProvider.jsx";

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

function Requisites() {
    const { data, loading, error } = useData();

    if (loading) return <p>Загрузка реквизитов...</p>;
    if (error) return <p>Ошибка загрузки данных: {error.message || error.toString()}</p>;

    if (!data || !data.partner_data) return <p>Нет данных партнера</p>;

    const partner = data.partner_data;


    const formattedData = [
        { title: "Название организации", value: partner.NAME },
        { title: "ФИО", value: partner.RQ_NAME },
        { title: "Юридический статус", value: partner.NAME },
        { title: "ИНН", value: partner.RQ_INN },
        { title: "Email", value: partner.email },
        { title: "Телефон", value: partner.phone },
        { title: "Система налогообложения", value: partner.UF_CRM_1754332172 },
        { title: "БИК", value: partner.RQ_BIK },
        { title: "Название банка", value: partner.RQ_BANK_NAME },
        { title: "Корреспондентский счет", value: partner.RQ_COR_ACC_NUM },
        { title: "Расчетный счет", value: partner.RQ_ACC_NUM },
        { title: "Есть презентация на платформе", value: true },
        { title: "Прямая ссылка на регистрацию", value: true },
        { title: "Реферальный промокод", value: partner.contact_id },
    ];


    const firstColumnData = formattedData.slice(0, formattedData.length - 3);
    const secondColumnData = formattedData.slice(-3);

    const contactId = String(partner.contact_id);


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
                        <RequisitesRow key={index}   title={
                            title === "Реферальный промокод" ? (
                                <span>{title}: </span>
                            ) : title
                        } value={value} contact_id={contactId} />
                    ))}
                </RequisitesColumn>
            </RequisitesContent>
        </RequisitesContainer>
    )
}

export default Requisites;