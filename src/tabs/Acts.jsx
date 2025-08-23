import styled from "styled-components";
import {useEffect, useMemo, useRef, useState} from "react";
import searchIcon from "./../assets/icons/search.svg";
import pdfIcon from "./../assets/icons/pdf.svg";
import downloadIcon from "./../assets/icons/download.svg";
import Input from "../ui/Input.jsx";
import {getActs} from "../api/apiMetods.js";

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

const SearchWrapper = styled.div`
    position: relative;
    width: 40px; 
    height: 40px;
    &>div>*{
        margin: 0; 
        
        &>input{
            border: none;
        }
    }
`;

const SearchButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  display: flex;
  align-items: center;
  transition: width 0.3s ease;
  width: ${({ $expanded }) => ($expanded ? "390px" : "40px")};
  z-index: 10;
`;

const SearchIcon = styled.img`
    width: 40px;
    height: 40px;
    padding: 8px;
    cursor: pointer;
    object-fit: scale-down;
`;

const AnimatedInput = styled(Input)`
    flex: 1;
    width: ${({ $expanded }) => ($expanded ? "100%" : "0px")};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    transition: opacity 0.1s ease 0.1s;
    border: none;
    background: transparent;
    &:focus {
        outline: none;
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


export const Acts = () => {
    const [acts, setActs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortDirection, setSortDirection] = useState("desc");
    const [searchShow, setSearchShow] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef(null);

    useEffect(() => {
        getActs()
            .then(res => {
                const actsArray = res.data.acts || [];
                const formatted = actsArray.map(act => ({
                    description: act.title,
                    date: new Date(act.createdDate).toLocaleDateString("ru-RU"),
                    rawDate: act.createdDate,
                    downloadUrl: act.downloadLink
                }));
                setActs(formatted);
            })
            .catch(err => {
                console.error("Ошибка загрузки актов:", err);
                setError("Не удалось загрузить акты");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpanded(false);
                setSearchShow(true);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSort = () => {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const filteredAndSortedActs = useMemo(() => {
        return acts
            .filter(act =>
                act.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice()
            .sort((a, b) => {
                const dateA = new Date(a.rawDate);
                const dateB = new Date(b.rawDate);
                return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
            });
    }, [acts, sortDirection, searchQuery]);


    if (loading) return <p>Загрузка актов...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ActsContainer>
            <Title>Акты выполненных работ</Title>
            <ActsListContainer>
                <TopBar>
                    <SearchWrapper>
                        <SearchButton $expanded={expanded} ref={containerRef} onClick={() => setSearchShow(false)} >
                            {searchShow &&
                                <SearchIcon
                                    src={searchIcon}
                                    alt="Поиск"
                                    onClick={() => setExpanded((prev) => !prev)}
                                />
                            }
                            <AnimatedInput $expanded={expanded} placeholder="Поиск" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                        </SearchButton>
                    </SearchWrapper>
                    <SortButton onClick={toggleSort}>
                        Дата
                        <SortArrow $direction={sortDirection}/>
                    </SortButton>
                    <Empty></Empty>
                </TopBar>

                <List>
                    {filteredAndSortedActs.map((act, idx) => (
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