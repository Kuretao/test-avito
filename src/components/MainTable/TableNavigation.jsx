import styled from "styled-components";
import {Dropdown} from "../../ui/Dropdown.jsx";

const NavContainer = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: #64748b;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PaginationControls = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`;

const PageButton = styled.button`
    border: 1px solid #cbd5e1;
    background: white;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;
    color: #334155;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;



export default function TableNavigation({
                                            page,
                                            setPage,
                                            totalPages,
                                            totalRecords,
                                            itemsPerPage,
                                            setItemsPerPage,
                                        }) {
    const itemsPerPageOptions = [
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: totalRecords, label: "Все" },
    ];

    return (
        <NavContainer>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Записей в странице:
                <Dropdown options={itemsPerPageOptions} value={itemsPerPage} onChange={setItemsPerPage} />
            </div>

            <div>
                {`${(page - 1) * itemsPerPage + 1}-${Math.min(page * itemsPerPage, totalRecords)} из ${totalRecords}`}
            </div>

            <PaginationControls>
                <PageButton onClick={() => setPage(1)} disabled={page === 1} aria-label="Первая страница">
                    {"<<"}
                </PageButton>
                <PageButton onClick={() => setPage(page - 1)} disabled={page === 1} aria-label="Предыдущая страница">
                    {"<"}
                </PageButton>
                <PageButton onClick={() => setPage(page + 1)} disabled={page === totalPages} aria-label="Следующая страница">
                    {">"}
                </PageButton>
                <PageButton onClick={() => setPage(totalPages)} disabled={page === totalPages} aria-label="Последняя страница">
                    {">>"}
                </PageButton>
            </PaginationControls>
        </NavContainer>
    );
}
