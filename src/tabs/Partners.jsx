import IndexHeader from "./../components/Header/index.jsx";
import Requisites from "./../components/Requisites/index.jsx";
import styled from "styled-components";
import IndexTable from "./../components/MainTable/index.jsx";


const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

function Partners() {

    return (
        <Main>
            <IndexHeader/>
            <Requisites/>
            <IndexTable/>
        </Main>
    )
}

export default Partners
