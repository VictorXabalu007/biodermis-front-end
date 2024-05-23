import { ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "../../../../shared/Button";
import { buttonItems } from "./util/buttomItems";

import { UserImage } from "../../../../shared/Image/UserImage";

import { FormModal } from "../Form";
import { InovicingModal } from "../Invoicing";
import { FormType } from "../../../../../@types/FormType/FormType";

// type NavigatorHeaderProps = {

//     // userImg: string,

// }


export const ModalNavigator = ({data, isReadonly}:FormType) => {

    const render = (key: string, isReadonly?:boolean) => {

        switch(key){
            case '1':
                return <FormModal data={data} isReadonly={isReadonly} />
            case '2':
                return <InovicingModal />
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

                        <div className="flex items-center justify-center">
  
                            {buttonItems.map((item) => {

                             return (

                                <Button.Root 
                                className={twMerge(item.className,selected === item.key ? SELECTED_CLASSNAME : '')}
                                onClick={() => handleSelect(item.key)}
                                key={item.key}
                                >

                                <Button.Wrapper>
                                    <Button.Content content={item.content} />
                                </Button.Wrapper>
                            </Button.Root>

                                );

                            })}

                        </div>
       

                    <UserImage />
                    
            <div>

                {component}

            </div>

        </div>

    )


}