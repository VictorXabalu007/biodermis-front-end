


declare global {

    type Product = {
        altura: string;
        categoria_ids: number[];
        descricao: string;
        estoque: string;
        id: number;
        imagens: string[]; 
        inativo: boolean;
        largura: string;
        mediaavs: string;
        nome: string;
        peso: string;
        profundidade: string;
        valormax: string;
        valormin: string;
        valorvenda: string;
        produto_id: number;
        valortotal:string,
        imagePath: any
        key:React.Key
    }

    
    type UserStatus = "ativo" | "inativo" | "em aprovação";


    type UserAddress = {
        cep: string;
        cidade: string;
        estado: string;
        rua: string;
        numero: string,
        bairro: string;
        usuario_id: number
        id:number
      }
      
      type UserCredentials = {
        agencia: string;
        banco:string,
        cargo_id: number;
        complemento:string
        conta: string;
        cpf: string;
        email: string;
        id: number;
        nome: string;
        pix: string;
        addressId:number,
        senharesettempo: string | null;
        senharesettoken: string | null;
        srccert: string | null;
        srcperfil: string | null;
        status: UserStatus;
        telefone: string;
        totalfat: string;
        valordispsaque: string;
        senha:string,
        rank: string
        cep: string;
        cidade: string;
        estado: string;
        rua: string;
        numero: string,
        bairro: string;
      }
      
      type User = {
      
        usuario: UserCredentials
        token: string
      
      
      }

      
    type BannerStatu = 'ativo' | 'inativo'

    type BannerTitle = 'Principal' | 'Promoção' | 'Mais Vendidos'

    type BannerImageType = {
        url:string
        order:string
    }

    type Banner = {
        id:number;
        titulo: BannerTitle,
        imagens: BannerImageType[]
    }

    type BannerModalProps = {
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };

    type Category = {
        categoria: string,
        id: number
    }
    

    type TextRootProps = {
        children:ReactNode;
        className?: string;
    }

    type Requests = {

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
        products: Product[]
        nome_consultor:string
        user_data: UserCredentials
        formaPag: string
        nomeCliente: string
    
    }

    type DeliveryStatus = 'Em andamento' | 'Recebido';

    
    type KeyType = 'sellChannel' | 'requests' | 'latestDays' | 'status'

    type PaymentStatus =  'Aprovado' | 'Aguardando';

    
    type Payment = 'PIX' | 'Cartão de crédito' | 'Boleto'

    export type SellOrSupply = 'Venda' | 'Abastecimento'

    type RegisterFieldProps<T extends FieldValues> = {

        errors: FieldErrors<T>,
        control:Control<T>
    
    }

    type WithDrawal = {
    
        consultor_id: number;
        datasaque: string;
        id: number;
        pedido_resto_id: number;
        pedidos_ids: number[];
        srccomp: string | null;
        status: 'pendente' | 'aprovado' | 'rejeitado'; 
        valorresto: string; 
        valorsaque: string; 
        nome_consultor:string
        saldo_disp: string
    
    }

    type Options = {
        value:string;
        label: string | React.ReactNode;
        key:number | string
    }

    type IconProps = {
        icon: ElementType,
        style?:CSSProperties,
        className?:string,
    }

    type FormType<T> = {
    
        isReadonly?: boolean;
        data: T;

    }

    type InvoicingStatus = 'pendente' | 'recebido';

    export type BankOptions = {
        code:number
        fullName:string,
        ispb:string
        name:string
      
     }

     export type MovimentationType = {
        id:number,
        tipo: 'entrada' | 'saída',
        valor:string,
        saque_id: number | null,
        pedido_id:number | null
    }

    type LayoutProps = {

        children: ReactNode;
    
    }

    type RequestStatusChange = "no change" | "increase" | "decrease";
    
    

}

export {}