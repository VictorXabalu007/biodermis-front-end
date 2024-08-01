
export type BannerStatusType = 'ativo' | 'inativo'

export type BannerTitle = 'Principal' | 'Promoção' | 'Mais Vendidos'

type BannerImageType = {
    url:string
    order:string
}

export type BannerType = {
    id:number;
    titulo: BannerTitle,
    imagens: BannerImageType[]
}
export type BannerModalProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
