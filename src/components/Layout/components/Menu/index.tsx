import { Menu as M } from "antd";
import { items } from "./util/items";
import { useEffect, useState } from "react";
import './styles.css'
import { Link } from "../../../shared/Link";
import { LinkContent } from "../../../shared/Link/LinkContent";
import { Exit } from "./components/Exit";
import './styles.css'
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { CONSULTORS, PRODUCTS, REGISTER_CONSULTOR, REGISTER_PRODUCTS } from "../../../../constants/paths/paths";



export const Menu = () => {

    const [selectedKey, setSelectedKey] = useState(location.pathname);

    const handleMenuSelect = ({ key }: {key:string}) => {

        setSelectedKey(key);

    };

    useEffect(()=> {

        if(location.pathname === REGISTER_CONSULTOR){
            setSelectedKey(CONSULTORS)
        }
        if(location.pathname === REGISTER_PRODUCTS){
            setSelectedKey(PRODUCTS)
        }

    },[location.pathname,selectedKey])

    const getBackgroundColor = (key: string) => {
        return selectedKey === key ? 'rgba(200, 130, 183, .2)' : 'transparent';
    };

    const getTextColor = (key: string) => {
        return selectedKey === key ? BRAND_PURPLE : 'rgba(152, 152, 152)';
    };

    const getFontWeightColor = (key: string) => {
        return selectedKey === key ? '600' : '400';
    };

    const getBorder = ( key: string) => {
        return selectedKey === key ? '4px solid rgba(200, 130, 183)' : 'none';
    }


    return (

        <M
            mode="inline"

            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '.5em',
                padding: 0,
                marginTop: '2.2em',
           
            }}
            defaultSelectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
            >       

                {items.map((item) => (

                        <M.Item 
                            
                            style={{

                                borderRadius: '0',
                                background: getBackgroundColor(item.key),
                                color: getTextColor(item.key),
                                fontWeight: getFontWeightColor(item.key),
                                borderLeft: getBorder(item.key),
                                transition: 'ease-in-out .1s',
                                padding: '1.7em',
                                width: '100%',
                         
                                
                            }}
                            
                            key={item.key}
                            >   
                            
                             <Link.Root 
                                
                                className="flex hover:font-semibold gap-2 items-center" 
                                path={item.path}
                                >
                                
                              
                                <Link.Icon
                                style={{fill: getTextColor(item.key)}} 
                                icon={item.icon} />

                                <LinkContent content={item.label} /> 

                            </Link.Root> 
                        
                        </M.Item>

                ))}

       
            <Exit />
       

        </M>

    );
    
};
