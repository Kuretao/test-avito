import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
    position: relative;
    width: 120px;
    user-select: none;
`;

const DropdownHeader = styled.div`
    padding: 6px 15px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background: #f7fafc;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 150px;
    overflow-y: auto;
    z-index: 999;
`;

const DropdownItem = styled.li`
    padding: 8px 15px;
    cursor: pointer;

    &:hover {
        background-color: #e2e8f0;
    }
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
                <span style={{ marginLeft: 10 }}>{open ? "▲" : "▼"}</span>
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