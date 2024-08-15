import { Button, Flex } from "antd";
import styled from "styled-components";


export const HoverShowText = styled(Button)`
transition: visibility 0s, opacity 0.3s linear;
`;


export const FlexWrapper = styled(Flex)`
    &:hover .hover-show-text {
        color: #C882B7;
    }
`;
