import styled from "styled-components";
import {useMemo, useState} from "react";
import searchIcon from "./../assets/icons/search.svg";
import pdfIcon from "./../assets/icons/pdf.svg";
import downloadIcon from "./../assets/icons/download.svg";

const ActsContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h2`
    font-family: Manrope,sans-serif;
    font-weight: 800;
    font-size: 30px;
    line-height: 100%;
    letter-spacing: 0;
    font-variant-numeric-figure: lining-nums;
    font-variant-numeric-spacing: proportional-nums;
    color: #006999;
`;

const ActsListContainer = styled.div`
    box-shadow: 0 2px 8px 0 #00466626;
    background-color: #fff;
    border-radius: 16px;
    padding: 8px;
    overflow: hidden;
`

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;


const SearchButton = styled.button`
    width: 40px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        width: 18px;
        height: 18px;
    }
`;

const SortButton = styled.button`
    background: none;
    border: none;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 13px;
    line-height: 100%;
    letter-spacing: 0;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const SortArrow = styled.span`
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    ${({$direction}) =>
            $direction === "desc"
                    ? "border-top: 5px solid #6b7280;"
                    : "border-bottom: 5px solid #6b7280;"}
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    overflow: hidden;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: ${({$odd}) => ($odd ? "#Fff" : "#0069990D")};

    font-family: Manrope;
    font-weight: 500;
    font-size: 15px;
    leading-trim: NONE;
    line-height: 24px;
    letter-spacing: 0;
    color: #475569;
    text-wrap: nowrap;
`;

const Column = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;

    &:nth-child(2) {
        justify-content: center;
    }

    &:nth-child(3) {
        justify-content: flex-end;
    }
`;

const DownloadButton = styled.button`
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 8px;
    background: #0069991A;
    color: #006999;
    font-family: Manrope,sans-serif;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        background: #dbe9f6;
    }
`;

const Empty = styled.div`
    display: block;
    width: 40px;
    height: 40px;
`

const actsData = Array(10).fill({
    description: "Акт выполненных работ № Л103 от 17.06.2025 г.",
    date: "24.07.2025",
    downloadUrl: "https://example.com/file.pdf",
});

export const Acts = () => {
    const [sortDirection, setSortDirection] = useState("desc");

    const toggleSort = () => {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const sortedActs = useMemo(() => {
        return actsData.sort((a, b) => {
            const dateA = new Date(a.date.split(".").reverse().join("-"));
            const dateB = new Date(b.date.split(".").reverse().join("-"));
            return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, [sortDirection]);

    return (
        <ActsContainer>
            <Title>Акты выполненных работ</Title>
            <ActsListContainer>
                <TopBar>
                    <SearchButton>
                        <img src={searchIcon} alt="Поиск"/>
                    </SearchButton>
                    <SortButton onClick={toggleSort}>
                        Дата
                        <SortArrow $direction={sortDirection}/>
                    </SortButton>
                    <Empty></Empty>
                </TopBar>

                <List>
                    {sortedActs.map((act, idx) => (
                        <ListItem key={idx} $odd={idx % 2 !== 0}>
                            <Column>
                                <img src={pdfIcon} alt="PDF" style={{width: 28}}/>
                                <span style={{fontWeight: 500}}>{act.description}</span>
                            </Column>
                            <Column>
                                <span style={{color: "#374151", fontWeight: 500}}>{act.date}</span>
                            </Column>
                            <Column>
                                <DownloadButton onClick={() => window.open(act.downloadUrl)}>
                                    <img src={downloadIcon} alt="download"/><span>Скачать</span>
                                </DownloadButton>
                            </Column>
                        </ListItem>
                    ))}
                </List>
            </ActsListContainer>
        </ActsContainer>
    );
};