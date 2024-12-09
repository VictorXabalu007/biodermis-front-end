export type ProductResponseFromApi = {
  id: number;
  nome: string;
  quantity: string;
  descricao: string;
  valormin: string;
  valormax: string;
  valorvenda: string;
  inativo: boolean;
  mediaavs: string;
  estoque: number;
  altura: string;
  peso: string;
  largura: string;
  profundidade: string;
  imagens: string[] | null;
  categoria_ids: number[];
};

export type KartProduct = {
  product: ProductResponseFromApi;
  quantity: number;
};
