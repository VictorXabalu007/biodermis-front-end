import { ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"
import { buttonItems } from "./buttomItems";
import { UserImage } from "../Image/user-image";
import { InovicingModal } from "./invoicing-modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../service/queryClient";
import { UserRole } from "../../../util/userRole";
import { RangeDateProvider } from "../../../context/RangeDate/RangeDateContext";
import { UserForm } from "../UserForm";
import { Button } from "antd";

export const ModalNavigator = ({data, isReadonly}:FormType<UserCredentials>) => {
    
    const render = (key: string, isReadonly?:boolean) => {

        switch(key){
            case '1':
                return (
                    <QueryClientProvider client={queryClient}>

                            <UserForm 
                                    data={data} 
                                    isReadonly={isReadonly}
                   
                                    

                                />
                                
                    </QueryClientProvider>
                )
                
                
            
            case '2':
                return data.cargo_id === UserRole.CONSULTOR && <InovicingModal data={data} />
                
        }

    }

    const [selected, setSelected] = useState('1');
    const [component, setComponent] = useState<ReactNode>(render(selected, isReadonly));

    const handleSelect = (key:string) => {
        
        setSelected(key);
        setComponent(render(key, isReadonly))
        

    };


    const SELECTED_CLASSNAME = 'bg-brand-purple text-white'
    
    return (

        
        
        <div className="mt-10 w-full">

                        {data.cargo_id === UserRole.CONSULTOR &&
                        
                            <div className="flex items-center justify-center">
    
                                {buttonItems.map((item) => {

                                return (

                                    <Button
                                    className={twMerge(item.className,selected === item.key ? SELECTED_CLASSNAME : '')}
                                    onClick={() => handleSelect(item.key)}
                                    key={item.key}
                                    >

                             
                                      {item.content}
                               
                                </Button>

                                    );

                                })}

                            </div>
                        
                        
                        }
       

                    <UserImage
                        image={data.srcperfil}
                    />
                    
            <div>
                
                <RangeDateProvider>

                    <QueryClientProvider client={queryClient}>

                            {component}

                    </QueryClientProvider>


                </RangeDateProvider>


            </div>

        </div>

    )


}