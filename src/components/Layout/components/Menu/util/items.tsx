

import { GoPackage, GoHome, GoPeople } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";
import { BiCategory, BiUser } from "react-icons/bi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BANNERS, CATEGORIES, CONSULTORS, HOME, INVOICING, PRODUCTS, REQUESTS, USERS, WITHDRAWAL } from "../../../../../constants/paths/paths";
import { PiFlagBannerFill } from "react-icons/pi";

export const items = [

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

}));
