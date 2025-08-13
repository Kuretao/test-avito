import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import SearchIcon from '../assets/icons/search.svg'
import ruFlag from "../assets/icons/RU@2x.png";
import uaFlag from "../assets/icons/RU@2x.png";
import byFlag from "../assets/icons/RU@2x.png";
import {IMaskInput} from "react-imask";

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 16px;
`;

const InputStyled = styled.input`
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #94A3BB;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    box-sizing: border-box;
    color: #64748B;
`;

const SearchButton = styled.button`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
`;

export default function Input({ value, style, onChange, onSearch, placeholder, icon }) {
    return (
        <InputWrapper style={style}>
            <InputStyled
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onSearch();
                }}
            />
            <SearchButton onClick={onSearch} aria-label="Search">
                {icon ? icon : < img src={SearchIcon} alt="search-icon"/>}
            </SearchButton>
        </InputWrapper>
    );
}



const FormGroup = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 4px;
    min-width: 250px;

    label {
        font-family: Manrope,sans-serif;
        font-weight: 500;
        font-size: 13px;
        leading-trim: NONE;
        line-height: 24px;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #64748B;
    }

    .error {
        position: absolute;
        bottom: -20px;
        font-family: Manrope,sans-serif;
        font-weight: 500;
        font-size: 13px;
        leading-trim: NONE;
        line-height: 20px;
        font-variant-numeric-figure: lining-nums;
        font-variant-numeric-spacing: proportional-nums;
        color: #9C2529;
    }
`;

const PhoneInputWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'error'
})`
    display: flex;
    align-items: center;
    border: 1px solid ${({ error }) => (error ? "#FF8E92" : "#CBD5E1")};
    border-radius: 8px;
    height: 40px;
    position: relative;
    background: #fff;

    &:focus-within {
        box-shadow: 0 0 0 4px ${({ error }) => (error ? "#FFECEC" : "#CCEFFF")};
    }
`;

const CountrySelect = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
    cursor: pointer;
    height: 100%;

    img {
        width: 20px;
        height: 15px;
        object-fit: contain;
    }

    span {
        font-size: 14px;
        color: #111;
    }
`;

const Dropdown = styled.ul`
    position: absolute;
    top: 42px;
    left: 0;
    background: #fff;
    list-style: none;
    margin: 0;
    padding: 4px 0;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    width: max-content;
    z-index: 50;

    li {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        cursor: pointer;

        img {
            width: 20px;
            height: 15px;
        }

        &:hover {
            background: #f1f5f9;
        }
    }
`;

const MaskedInputStyled = styled(IMaskInput)`
    border: none;
    flex: 1;
    padding: 0 8px;
    outline: none;
    font-size: 14px;
    height: 100%;
`;

const HR = styled.hr`
    border: none;
    display: block;
    width: 1px;
    height: 24px;
    background-color: #CBD5E1;
`

export function PhoneInput({ value, onChange, error }) {
    const countries = [
        { code: "+7", flag: ruFlag, mask: "+{7} (000) 000-00-00" },
        { code: "+380", flag: uaFlag, mask: "+{380} (00) 000-00-00" },
        { code: "+375", flag: byFlag, mask: "+{375} (00) 000-00-00" },
    ];

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
        onChange("");
    };

    return (
        <FormGroup>
            <label>Укажите номер телефона клиента *</label>
            <PhoneInputWrapper ref={dropdownRef} error={!!error}>
                <CountrySelect onClick={() => setShowDropdown((prev) => !prev)}>
                    <img src={selectedCountry.flag} alt="flag" />
                    <span>{selectedCountry.code}</span>
                </CountrySelect>

                {showDropdown && (
                    <Dropdown>
                        {countries.map((c, idx) => (
                            <li key={idx} onClick={() => onCountrySelect(c)}>
                                <img src={c.flag} alt="flag" />
                                <span>{c.code}</span>
                            </li>
                        ))}
                    </Dropdown>
                )}
                <HR/>
                <MaskedInputStyled
                    mask={selectedCountry.mask}
                    value={value}
                    onAccept={(val) => onChange(val)}
                    unmask={false}
                    placeholder={selectedCountry.mask.replace(/[{}]/g, "")}
                />
            </PhoneInputWrapper>
            {error && <span className="error">{error}</span>}
        </FormGroup>
    );
}
