import {  ReactNode } from "react"
import styled from 'styled-components';



type SelectRootProps = {
    children:ReactNode,
    icon?:ReactNode
    className?:string,
}

export const SelectRoot = ({children,icon, className}:SelectRootProps) => {

    const Wrapper = styled.div`

        position: relative;

        .prefix-icon-wrapper {
            position: absolute;
            z-index: 1;
            width: 3rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 5px;
        }
        
        ${icon && `&& .ant-select .ant-select-selector {
            padding-left: calc(3rem - 8px);
        }`}

        .ant-select .ant-select-selector {
            padding: 1.3rem;
        }

        .ant-select .ant-select-arrow {
            margin-top: 2px;
        
        }

        .ant-select-selection-item{
            font-weight: 600;
            color: #7C7C7C;
        }

        .ant-select-selector {

            &:hover {
                border: 1px solid #989898 !important; 
            }
            
        }

    `;


    return (

        <Wrapper className={className}>

            <div className="prefix-icon-wrapper">
                {icon}
            </div>

            {children}

        </Wrapper>

    );
    
}