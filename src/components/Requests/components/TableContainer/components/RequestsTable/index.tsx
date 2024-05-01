import { Table } from "../../../../../shared/Table";
import { requestColumns, requestData } from "./util/requestsData";




export const RequestsTable = () => {


    return (

        <div className="pb-3 flex-1">
        
            <Table 
                data={requestData}
                columns={requestColumns}
            />
        
        </div>

    );


}