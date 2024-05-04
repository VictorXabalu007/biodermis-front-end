import { theme } from "antd";
import { Header as H } from "antd/es/layout/layout";
import { BORDER_GRAY } from "../../../../constants/classnames/classnames";
import { Heading } from "../../../shared/Heading";
import { Text } from "../../../shared/Text";


export const Header = ({heading}:{heading:string}) => {

    const {

        token: { colorBgContainer },
    
      } = theme.useToken();
    
      
    return (
        <>
        <H style={{ 
            background: colorBgContainer,
            height: '96px', 
            borderBottom: BORDER_GRAY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem',
            lineHeight: 1.3
        }} 
  
            >
            <div >
                <Heading.Root>
                    <Heading.Content content={heading} />
                </Heading.Root> 
                <Text.Root>
                    <Text.Content content="Lorem ipsum dolor sit amet consectetur."/>
                </Text.Root> 
            </div>

            <div>
                <Heading.Root>
                    <Heading.Content content="Username" />
                </Heading.Root>  
            </div>     

        </H>


        </>


    );


}