import styled from "styled-components";

export const Wrapper = styled.div`
    
.ant-steps-item-icon,
.ant-steps-item-tail {
  display: none !important;
}

.ant-steps-item-wait::after{
    display:none !important;
}
.ant-steps-item-active::after{
    display:none !important;
}
.ant-steps-item-finish::after{
    display:none !important;
}

.ant-steps-item-active .ant-steps-item-title{
    color: #B475A5 !important;
}

.ant-steps-item-title{
   
    &:hover {
        color: #B475A5 !important;
    }
}

.ant-steps-item-active::before{
    background: #B475A5 !important;
}

`;