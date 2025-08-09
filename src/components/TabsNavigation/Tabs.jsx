import styled from "styled-components";
import { NavLink } from "react-router-dom";

const TabsContainer = styled.nav`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 20px;
    background: #0069991F;
    border-radius: 8px;
    gap: 4px;
    padding: 4px;
`;

const Tab = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Raleway, sans-serif;
    width: 100%;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    color: #475569;
    border-bottom: 1px solid transparent;
    padding: 4px 16px;
    flex: 1;
    text-decoration: none;
    border-radius: 6px;
    max-height: 40px;
    text-wrap: nowrap;
    

    &.active {
        background: #FFFFFF;
    }
`;

export const TabsNavigation = () => {
    return (
        <TabsContainer>
            <Tab to="/">Партнерский счет</Tab>
            <Tab to="/referral">Рефералы</Tab>
            <Tab to="/registration">Ссылка и регистрации</Tab>
            <Tab to="/payToReferral">Оплаты рефералов</Tab>
            <Tab to="/rules">Правила</Tab>
            <Tab to="/acts">Акты</Tab>
        </TabsContainer>
    );
};
