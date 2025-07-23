import styled from "styled-components";
import {HeaderDataItem} from "./HeaderData.jsx";
import {ButtonDefault} from "../../ui/Button.jsx";

const Data = [
    {
        id: 1,
        title: 'Баланс на счете',
        question: true,
        value: 200,
    },
    {
        id: 2,
        title: 'Баланс на счете',
        question: false,
        value: "40%",
    },
]

const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF80;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px 0 #00466626;
`

const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`

function IndexHeader() {
    return (
        <Header>
            <HeaderContent>
                {Data.map((item) => (
                    <HeaderDataItem index={item.id} title={item.title} question={item.question} value={item.value} />
                ))}
            </HeaderContent>

            <ButtonDefault ButtonTitle={"Запрос на выплату"}/>
        </Header>
    )
}

export default IndexHeader;