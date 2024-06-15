import { FaArrowRightFromBracket } from "react-icons/fa6"
import { DEFAULT_PATH } from "../../../../../../constants/paths/paths";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";



export const Exit = () => {

    const navigate = useNavigate();

    const logout = () => {
        navigate(DEFAULT_PATH)
        sessionStorage.clear();
    }

    const Wrapper = styled.div`
    
        .ant-button {

            border: none !important;
            &:hover {
                color: #C882B770 !important
            }
        }
    
    `

    return (

        <Wrapper>

            <Button     
            className="ant-button hover:text-brand-purple/25 border-transparent p-[1.7rem] mt-24 text-brand-purple flex items-center justify-start gap-2"
            onClick={logout}
            >
                
                <FaArrowRightFromBracket />
                Sair    

            </Button>

        </Wrapper>

    );
}