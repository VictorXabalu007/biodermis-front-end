import { ProductsType } from "../../../Products/service/getProducts";




export type Requests = {

    cliente_id: number;
    consultor_id: number;
    nome_consultor: string,
    consultpago: boolean;
    datapedido: string; 
    formapag_id: number | null;
    id: number;
    modelo: string;
    produtos_ids: number[]; 
    resto: string;
    saldodisp: boolean;
    statusentrega: string;
    statuspag: string;
    valor: string;
    valorconsult: string;
    valorfrete: string;
    products:ProductsType[];

}