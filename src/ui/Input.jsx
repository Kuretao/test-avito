import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
    position: relative;
    max-width: 400px;
    margin-bottom: 16px;
`;

const InputStyled = styled.input`
    width: 100%;
    padding: 10px 40px 10px 15px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 14px;
    background: #f7fafc;
    box-sizing: border-box;
`;

const SearchButton = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
`;

export default function Input({ value, onChange, onSearch, placeholder }) {
    return (
        <InputWrapper>
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
                search
            </SearchButton>
        </InputWrapper>
    );
}
