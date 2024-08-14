import { Menu as M } from "antd";
import { items } from "./util/items";
import { useEffect, useState } from "react";
import './styles.css'
import { Link } from "../../../shared/Link";
import { LinkContent } from "../../../shared/Link/LinkContent";

import './styles.css'
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { SELECTED_MENU_KEY } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { useLocation } from "react-router-dom";
import { ExitButton } from "../../../shared/Button/ExitButton";



export const Menu = () => {

    const location = useLocation();

    const initialKey = JSON.parse(sessionStorage.getItem(SELECTED_MENU_KEY) ?? '0' ) || '0';

    const [selectedKey, setSelectedKey] = useState(initialKey);

    const handleMenuSelect = ({ key }: { key: string }) => {
        setSelectedKey(key);
        sessionStorage.setItem(SELECTED_MENU_KEY, JSON.stringify(key));
    };

    useEffect(() => {
        setSelectedKey(initialKey);
    }, [initialKey]);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = items.find(item => item.path === currentPath);
        if (currentItem) {
            setSelectedKey(currentItem.key);
            sessionStorage.setItem(SELECTED_MENU_KEY, JSON.stringify(currentItem.key));
        }
    }, [location]);

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
                            className="menu-item"
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

       
                <ExitButton />
       

        </M>

    );
    
};
