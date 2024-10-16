import { Menu as M } from "antd";

import { useEffect, useState } from "react";
import './styles.css'
import { Link } from "../shared/Link";
import { LinkContent } from "../shared/Link/LinkContent";

import './styles.css'
import { BRAND_PURPLE } from "../../constants/classnames";
import { AUTH_USER, SELECTED_MENU_KEY } from "../../constants/sessionStorageKeys";
import { useLocation } from "react-router-dom";
import { ExitButton } from "../shared/Button/ExitButton";
import { GoPackage, GoHome, GoPeople } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";
import { BiCategory, BiUser } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

import { PiFlagBannerFill } from "react-icons/pi";
import { BANNERS, CATEGORIES, CONSULTORS, HOME, INVOICING, PRODUCTS, REQUESTS, USERS, WITHDRAWAL } from "../../constants/paths";
import { UserRole } from "../../util/userRole";


export const Menu = () => {

    const location = useLocation();

    const initialKey = JSON.parse(sessionStorage.getItem(SELECTED_MENU_KEY) ?? '0' ) || '0';

    
    const user = JSON.parse(sessionStorage.getItem(AUTH_USER) ?? '{}');

  
    const [selectedKey, setSelectedKey] = useState(initialKey);

    const handleMenuSelect = ({ key }: { key: string }) => {
        setSelectedKey(key);
        sessionStorage.setItem(SELECTED_MENU_KEY, JSON.stringify(key));
    };

    const generateMenu = () => {


        switch(user.usuario.cargo_id){
           
            // Usuarios gerente possuem acesso a todos os menus menos o de pedidos de saque
            case UserRole.MANAGER:
                return (
                    [

                        { icon: GoHome, label: 'Home', path: HOME },
                        { icon: RiTruckLine , label: 'Pedidos', path: REQUESTS },
                        { icon: GoPeople, label: 'Consultores', path: CONSULTORS},
                        { icon: BiUser, label: 'Usuários', path: USERS },
                        { icon: GoPackage, label: 'Produtos', path: PRODUCTS },
                        { icon: BiCategory , label: 'Categorias', path: CATEGORIES },
                        { icon: PiFlagBannerFill, label: 'Banners',  path: BANNERS },
                        { icon: LiaMoneyBillWaveSolid, label: 'Faturamento',  path: INVOICING },
                      
                      
                      ].map((item,index) => ({
                      
                        key: String(index),
                        icon: item.icon,
                        label: item.label,
                        path: item.path,
                      
                      }))
                )
            case  UserRole.STOCK:
                //USUARIOS estoque possuem acesso somente a área de pedidos
                return (
                      [

                        { icon: RiTruckLine , label: 'Pedidos', path: REQUESTS },
                      
                      
                      ].map((item,index) => ({
                      
                        key: String(index),
                        icon: item.icon,
                        label: item.label,
                        path: item.path,
                      
                      }))
                )
                //USUARIOs admin possuem acesso a toda a aplicação
            default: 
                return (
                    [

                        { icon: GoHome, label: 'Home', path: HOME },
                        { icon: RiTruckLine , label: 'Pedidos', path: REQUESTS },
                        { icon: GoPeople, label: 'Consultores', path: CONSULTORS},
                        { icon: BiUser, label: 'Usuários', path: USERS },
                        { icon: GoPackage, label: 'Produtos', path: PRODUCTS },
                        { icon: BiCategory , label: 'Categorias', path: CATEGORIES },
                        { icon: PiFlagBannerFill, label: 'Banners',  path: BANNERS },
                        { icon: FaHandHoldingDollar, label: 'Pedidos de saque', path: WITHDRAWAL },
                        { icon: LiaMoneyBillWaveSolid, label: 'Faturamento',  path: INVOICING },
                    
                    
                    ].map((item,index) => ({
                    
                        key: String(index),
                        icon: item.icon,
                        label: item.label,
                        path: item.path,
                    
                    }))
                )
                
        }

    }
    

    useEffect(() => {
        setSelectedKey(initialKey);
    }, [initialKey]);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = generateMenu().find(item => item.path === currentPath);
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

                {generateMenu().map((item) => (

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
