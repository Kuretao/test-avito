import styled from "styled-components";
import {HeaderDataItem} from "./HeaderData.jsx";
import {ButtonDefault} from "../../ui/Button.jsx";
import {useState} from "react";
import {IndexModal} from "../Modal/Index.jsx";

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
        value: <>40 <br/> %</>
    },
    {
        id: 3,
        title: 'Баланс на счете',
        question: false,
        value: <>40 <br/> %</>
    },
    {
        id: 4,
        title: 'Баланс на счете',
        question: false,
        value: <>40 %</>
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
    max-height: 55px;
    
    &>div:first-child>div:last-child {
        color: #006999;
    }
`

const HeaderLeftSide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`

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
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: Manrope, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: #475569;
    cursor: pointer;
`;


function IndexHeader() {
    const [show, setShow] = useState(false);

    return (
        <Header>
            <HeaderContent>
                {Data.map((item) => (
                    <HeaderDataItem index={item.id} title={item.title} question={item.question} value={item.value} />
                ))}
            </HeaderContent>

            <HeaderLeftSide>
                {show &&
                    <HeaderCheckboxLabel>
                        <HeaderCheckbox type="checkbox" id="agree" />
                        <CustomCheckbox/>
                        Ознакомлен с индивидуальным <br /> партнёрским соглашением
                    </HeaderCheckboxLabel>
                }

                <ButtonDefault ButtonTitle={show ? 'Запрос на выплату' : 'Продолжить'} onClick={() => setShow(!show)}/>
            </HeaderLeftSide>
        </Header>
    )
}

export default IndexHeader;