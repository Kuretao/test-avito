import React from "react";
import styled, { css } from "styled-components";

const optionStyles = {
    info: css`
    background-color: #E2E8F0;
    color: #64748B;
  `,
    success: css`
    background-color: #C8E49D;
    color: #4A7309;
  `,
};

const OptionWrapper = styled.span`
  display: inline-block;
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 8px;
  white-space: nowrap;
  ${({ type }) => optionStyles[type] || optionStyles.info}
`;

export default function OptionTable({ children, type = "info" }) {
    return <OptionWrapper type={type}>{children}</OptionWrapper>;
}
