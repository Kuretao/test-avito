import styled from "styled-components";
import {Dropdown} from "../../ui/Dropdown.jsx";
import prev from '../../assets/icons/Vector 2981.svg'
import next from '../../assets/icons/Vector 2981-1.svg'
import end from '../../assets/icons/angle-left-forward.svg'
import start from '../../assets/icons/Group 656.svg'


const NavContainer = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: #64748b;
    display: flex;
    justify-content: end;
    gap: 20px;
    align-items: center;
`;

const PaginationControls = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const PageButton = styled.button`
    cursor: pointer;
    width: 36px;
    aspect-ratio: 1/1;

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
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                Записей в странице:
                <Dropdown options={itemsPerPageOptions} value={itemsPerPage} onChange={setItemsPerPage} />
            </div>

            <div>
                {`${(page - 1) * itemsPerPage + 1}-${Math.min(page * itemsPerPage, totalRecords)} из ${totalRecords}`}
            </div>

            <PaginationControls>
                <PageButton onClick={() => setPage(1)} disabled={page === 1} aria-label="Первая страница">
                    <img src={end} alt="end"/>
                </PageButton>
                <PageButton onClick={() => setPage(page - 1)} disabled={page === 1} aria-label="Предыдущая страница">
                    <img src={prev} alt="end"/>
                </PageButton>
                <PageButton onClick={() => setPage(page + 1)} disabled={page === totalPages}
                            aria-label="Следующая страница">
                    <img src={next} alt="end"/>
                </PageButton>
                <PageButton onClick={() => setPage(totalPages)} disabled={page === totalPages}
                            aria-label="Последняя страница">
                    <img src={start} alt="end"/>
                </PageButton>
            </PaginationControls>
        </NavContainer>
    );
}
