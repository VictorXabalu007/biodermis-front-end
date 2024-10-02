import { UserCredentials } from "../../../@types/UserData/UserData";
import { ProductsType } from "../../Products/service/getProducts";




export type Requests = {

    bairro: string;
    cep: string;
    cidade: string;
    cliente_id: number;
    codigorastreio: string | null;
    complemento: string;
    consultor_id: number;
    consultpago: boolean;
    dataenvio: string | null;
    datapedido: string;
    estado: string;
    formaenvio: string | null;
    formapag_id: number;
    id: number;
    linkpagamento: string;
    mercadopago_id: string;
    modelo: string;
    numero: string;
    produtos_ids: {id:number,quantidade:number}[];
    resto: string;
    rua: string;
    saldodisp: boolean;
    statusentrega: string;
    statuspag: string;
    valor: string;
    valorconsult: string;
    valorfrete: string;
    products: ProductsType[]
    nome_consultor:string
    user_data: UserCredentials
    formaPag: string
    nomeCliente: string

}