import React from "react";
import styled from "styled-components";

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
