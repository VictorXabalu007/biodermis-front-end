

import { Flex } from "antd";
import HomeConsultorsTable from "./homeTables/consultors-table";
import HomeWithdrawTable from "./homeTables/withdraw-table";


const HomeTables = () => {


    return (

        <Flex 
            gap={15}
            vertical
        >

            <HomeConsultorsTable

            />

            <HomeWithdrawTable 
            
            />

        </Flex>


    );

}

export default HomeTables