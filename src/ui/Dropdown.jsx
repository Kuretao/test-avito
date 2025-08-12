import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import arrow from "../assets/icons/angle-down.svg"

const DropdownWrapper = styled.div`
    position: relative;
    width: max-content;
    user-select: none;
    min-width: 110px;
`;

const DropdownHeader = styled.div`
    padding: 4px 16px;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    background: #FFFFFF80;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    color: #64748B;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0%;
`;

const DropdownList = styled.ul`
    position: absolute;
    transform: translateY(-100%);
    top: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
    height: max-content;
    overflow-y: auto;
    z-index: 999;
    box-shadow: 0 2px 12px 0 #00466633;
`;

const DropdownItem = styled.li`
    font-family: Manrope,sans-serif;
    font-weight: 500;
    height: 40px;
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid #CBD5E1;
`;

export function Dropdown({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedLabel = options.find((opt) => opt.value === value)?.label;

    return (
        <DropdownWrapper ref={ref}>
            <DropdownHeader onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}>
                <span>{selectedLabel || "Выберите"}</span>
                <span style={{ marginLeft: 10 }}>{open ? <img style={{transform:"rotate(180deg)"}} src={arrow} alt="arrow"/> : <img src={arrow} alt="arrow"/>}</span>
            </DropdownHeader>
            {open && (
                <DropdownList role="listbox">
                    {options.map((option) => (
                        <DropdownItem
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    );
}