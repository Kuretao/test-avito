import {Route, Routes} from "react-router-dom";
import Partners from "./tabs/Partners.jsx";
import {TabsNavigation} from "./components/TabsNavigation/Tabs.jsx";
import styled from "styled-components";
import Referrals from "./tabs/Referrals.jsx";
import ReferralComponent from "./tabs/Register.jsx";
import {PayReferrals} from "./tabs/PayReferrals.jsx";
import {Rules} from "./tabs/Rules.jsx";
import {Acts} from "./tabs/Acts.jsx";
import {DataProvider} from "./DataProvider/DataProvider.jsx";


const Wrapper = styled.main`
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 1110px;
`

function AppRoutes(){
    return (
        <DataProvider>
            <Wrapper>
                <TabsNavigation/>
                <Routes>
                    <Route path="/" element={<Partners />} />
                    <Route path="/referral" element={<Referrals />} />
                    <Route path="/registration" element={<ReferralComponent/>}/>
                    <Route path="/payToReferral" element={<PayReferrals/>}/>
                    <Route path="/rules" element={<Rules/>}/>
                    <Route path="/acts" element={<Acts/>}/>
                </Routes>
            </Wrapper>
        </DataProvider>
    )
}

export default AppRoutes;