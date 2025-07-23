import styled from "styled-components";
import {HeaderDataItem} from "./HeaderData.jsx";

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
    background-color: #fff;
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
                    <HeaderDataItem key={item.id} title={item.title} question={item.question} value={item.value} />
                ))}
            </HeaderContent>
        </Header>
    )
}

export default IndexHeader;