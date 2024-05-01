import { Button } from "../../../shared/Button";
import { Heading } from "../../../shared/Heading";
import { Table } from "../../../shared/Table"
import { items } from "./util/items";


export const TableContainer = () => {

    const TABLE_WIDTH = 'auto';

    return (

        <div className="flex w-full lg:w-[40%] flex-col gap-5 px-2 pb-2">

                {items.map((item,index) => {
                    return (

                    <div key={index} className="flex gap-3 flex-col border rounded-md border-neutral-gray-100 p-3" >
                        <div className="flex justify-between">

                            <Heading.Root className="text-[16px]">
                                <Heading.Content content={item.title} />
                            </Heading.Root>

                            <Button.Root>
                                <Button.Content content="Gerenciar" />
                            </Button.Root>

                        </div>

                        <Table
                        style={{width: TABLE_WIDTH}}
                        columns={item.columns}
                        data={item.data}
                        />
                        
                     </div>

                    );

                })};
           
        </div>

    );
}