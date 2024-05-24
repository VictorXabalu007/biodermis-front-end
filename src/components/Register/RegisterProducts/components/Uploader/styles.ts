import styled from "styled-components";



export const UploaderWrapper = styled.div`



        width: 100%;
        display:flex;
        flex-direction:column;
        gap: 1em; 


        .ant-upload-wrapper .ant-upload-list{
            overflow-x: scroll !important;
        }

        .uploader-icon svg {
            fill : #B475A5 !important;
            transform: rotate(180deg);
            width:50px;
            height:30px;
        }

        .ant-upload-list-item-actions .anticon-delete svg {
            fill:#FF4D4F;
        }

        .ant-upload-list .ant-upload-list-picture-card {
            overflow: scroll !important;
        }

        .ant-upload-list {
            margin-top: 1em;
        
        }

        .ant-upload-list-item-container{
            width: 200px !important;
        }

`;