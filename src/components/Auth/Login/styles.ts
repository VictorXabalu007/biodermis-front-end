import styled from "styled-components";



export const BtnWrapper = styled.div`

    .auth-btn {
        &:hover{
            background: #C882B790 !important;
            border-color: #C882B7 !important;
            color: #FFF !important; 
        }
    }


`

export const InputWrapper = styled.div`


    .ant-input {

        .ant-input-suffix .ant-input-password-icon svg {
            fill: #C882B7 !important;
        }

        

        &:hover{
            
            border-color: #C882B7 !important;
         
        }

        &:focus{
            border-color: #C882B7 !important;
       
        }

        svg {
            fill: currentColor;
        }
    }


`