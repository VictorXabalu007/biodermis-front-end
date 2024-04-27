import { Menu as M } from "antd";
import { items } from "./util/items";
import { useState } from "react";
import './styles.css'
import { Link } from "../../../shared/Link";
import { LinkContent } from "../../../shared/Link/LinkContent";
import { Exit } from "./components/Exit";

export const Menu = () => {

    const [selectedKey, setSelectedKey] = useState('1');

    const handleMenuSelect = ({ key }: any) => {
        setSelectedKey(key);
    };

    const getBackgroundColor = (key: string) => {
        return selectedKey === key ? 'rgba(200, 130, 183, .2)' : 'transparent';
    };

    const getTextColor = (key: string) => {
        return selectedKey === key ? 'rgba(200, 130, 183)' : 'rgba(152, 152, 152)';
    };

    const getFontWeightColor = (key: string) => {
        return selectedKey === key ? '600' : '400';
    };

    const getBorder = ( key: string) => {
        return selectedKey === key ? '4px solid rgba(200, 130, 183)' : 'none';
    }

    const getHoverStyles = (key: string) => {
        return selectedKey !== key ? {
            ":hover": {
                background: 'rgba(200, 130, 183, .2)',
                color: 'rgba(200, 130, 183)',
                fontWeight: '600',
            }
        } : {};
    };


    return (

        <M
            mode="inline"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                padding: 0,
                minHeight: '100vh',
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
                                ...getHoverStyles(item.key),
                                padding: '1.7em',
                                width: '100%'
                                
                            }}
                            
                            key={item.key}
                            >   
                            
                            <Link.Root 
                                className="text-brand-purple flex gap-2 items-center" 
                                path={item.path}
                                >
                                
                                <Link.Icon icon={item.icon} />
                                <LinkContent content={item.label} /> 

                            </Link.Root>

                        </M.Item>

                


                ))}
        
            <Exit />
       

        </M>

    );
    
};
