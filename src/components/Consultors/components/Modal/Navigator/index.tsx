import { ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "../../../../shared/Button";
import { FormModal } from "../Form";
import { buttonItems } from "./util/buttomItems";
import { render } from "./functions/render";
import { UserImage } from "../../../../shared/Image/UserImage";

// type NavigatorHeaderProps = {

//     // userImg: string,

// }


export const ModalNavigator = () => {

    const [selected, setSelected] = useState('1');
    const [component, setComponent] = useState<ReactNode>(<FormModal />);

    const handleSelect = (key:string) => {
        
        setSelected(key);
        setComponent(render(key))
        

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