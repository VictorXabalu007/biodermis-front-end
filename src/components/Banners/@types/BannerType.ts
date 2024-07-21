
export type BannerStatusType = 'ativo' | 'inativo'

export type BannerCategory = 'maisVendido' | 'promocao' | 'principal'

export type BannerType = {
    id:number;
    src: string,
    name: string,
    status: BannerStatusType,
    category: BannerCategory
}
export type BannerModalProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
