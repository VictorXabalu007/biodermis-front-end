import styled from "styled-components";



export const Container = styled.div`
    overflow-x: auto;
    max-width: 100%; 


`;

export const Table = styled.table`
    width: 100%; 
    border-collapse: collapse; 
`;

export const Th = styled.th`
    font-size: 12px;
    color: #656565;
    font-weight: 400;
    border-bottom: 1px solid #ddd; 
    padding: .7rem 0;
    background-color: #f5f5f5;
    border-radius: 5px 5px 0 0;
    text-align:center;
`;

export const Td = styled.td`
    font-size: 12px;
    color: #656565;
    font-weight: 400;
    border-bottom: 1px solid #ddd; 
    padding: 1rem 0;
    text-align: center;
`;


export const EvenRow = styled.tr`
    background-color: #f9f9f9;
`;

export const HoverRow = styled.tr`
    &:hover {
        background-color: #f0f0f0;
    }
`;



