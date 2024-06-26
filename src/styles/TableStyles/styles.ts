import styled from "styled-components";



export const Container = styled.div`

    overflow-x: auto;
    background-color: #FFF;

`;

export const Table = styled.table`

    border-collapse: collapse; 
    width:100%;
    min-width:330px;
  

 
`;

export const Thead = styled.thead`

    background-color: #DCDCDC;

`;


export const Td = styled.td`
    font-size: 12px;
    color: #656565;
    font-weight: 400;
    border-bottom: 1px solid #ddd; 
    padding: 1rem 0;
    text-align:center;
    
`;


export const EvenRow = styled.tr`
    background-color: #f9f9f9;
`;

export const HoverRow = styled.tr`
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Resizer = styled.div`


        position: absolute;
        opacity: 0;
        top: 0;
        right: 0;
        height: 100%;
        width: 5px;
        background-color: #BDBDBD;
        cursor: col-resize;
        userSelect: none;
        touchAction: none;
        borderRadius: 6px;

        &:hover {
            opacity: 1;
        }

        &.isResizing {
            opacity: 1;
            background-color: #989898;
        }

`;

export const Th = styled.th`
    font-size: 12px;
    color: #656565;
    font-weight: 400;
    border-bottom: 1px solid #ddd; 
    padding: .7rem 0;
    background-color: #f5f5f5;
    position: relative;
    text-align:center;


    &:hover > ${Resizer} {
        opacity: 1;
    }

    & .menu {
       visibility: hidden;
    }
    & :hover {

        .menu{
            visibility: visible;
        }
    }

`;
