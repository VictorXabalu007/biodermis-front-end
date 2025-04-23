import { useQuery } from "@tanstack/react-query";
import {
	getAllProducts,
	getProducts,
} from "../../components/Products/service/getProducts";
import { useCallback, useEffect, useState } from "react";
import { isValidURL } from "../../functions/Validators/isLink";
import { API_URL } from "../../service/url";
import { getHeaders } from "../../service/getHeaders";
import { api } from "../../service/connection";
import BiodermisApi from "../../service/baseURL";
import Api from "../../service/api";
import { useRangeDate } from "../../context/RangeDate/RangeDateContext";

export const useProductsData = () => {
	const { data, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});
	const { state, getDates } = useRangeDate()
	const { data: prodMoreSelled, isLoading: isLoadingMoreSelled, refetch } = useQuery({
		queryKey: ['mais-vendido'],
		queryFn: async () => {
			const headers = getHeaders();
			const st = getDates(state);
			const startDate = st.startDate;
			const endDate = st.endDate;
			const url = `/pedido-mais-vendido/?startDate=${startDate}&endDate=${endDate}`;
			const req = await api.get(url, {
				headers
			});
			return req.data.length && req.data[0];
		}
	})
	useEffect(() => {
		refetch()
	}, [state])
	const { data: totalProducts } = useQuery<Product[]>({
		queryKey: ["allProducts"],
		queryFn: () => getAllProducts(),
	});

	const [allProducts, setAllProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (totalProducts) {
			setAllProducts(totalProducts);
		}
	}, [totalProducts]);

	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (data) {
			const newProducts = data.map((p) => {
				const hasImages = p?.imagens && p.imagens.length > 0;

				if (hasImages) {
					const firstImage = p.imagens[0];
					const path = firstImage ? firstImage.replace(/\\/g, "\\") : "";

					const isLink = isValidURL(path);

					return {
						...p,
						imagePath: isLink ? path : `${API_URL}/${path}`,
						key: p.id,
					};
				} else {
					return {
						...p,
						key: p.id,
					};
				}
			});

			setProducts(newProducts);
		}
	}, [data]);

	const getProductsById = useCallback(
		async (id: number | number[]): Promise<Product[]> => {
			try {
				if (Array.isArray(id)) {
					// Busca múltiplos IDs
					const responses = await Promise.all(
						id.map((i) => BiodermisApi.get(`${Api.productsById}${i}`)),
					);

					const products = responses.map((res) => res.data);
					return products;
				} else {
					// Busca único ID
					const response = await BiodermisApi.get(
						`${Api.baseUrl}${Api.productsById}${id}`,
					);
					return [response.data];
				}
			} catch (error) {
				console.error("Erro ao buscar produtos:", error);
				return []; // Retorna array vazio em caso de erro
			}
		},
		[],
	);

	const getProductsByArrayId = useCallback(
		(ids: number[]) => {
			return ids.map((id) => allProducts.find((p) => p.id === id));
		},
		[allProducts],
	);

	const getImageByPath = async (path: string) => {
		const headers = getHeaders();

		try {
			const req = await api.get(`/${path}`, {
				headers,
			});
			return req.data;
		} catch (e: any) { }
	};

	const getGreatherSoldProduct = () => {
		console.log('called')
		// const product =
		// 	products?.sort(
		// 		(a, b) => parseFloat(a.mediaavs) - parseFloat(b.mediaavs),
		// 	)[0] || {};
		// return product;
		return prodMoreSelled;
	};

	const getProductIdByName = (name: string) => {
		const id = products.find((p) => p.nome === name)?.id;
		return id;
	};

	const getGreatherProductPercentualChange = () => {
		if (products.length === 0) return 0;

		const totalMediaavs = products.reduce((sum, product) => {
			const mediaavs = parseFloat(product.mediaavs);
			return sum + (isNaN(mediaavs) ? 0 : mediaavs);
		}, 0);

		const greatherSoldProduct = getGreatherSoldProduct();

		if (
			!greatherSoldProduct.mediaavs ||
			isNaN(parseFloat(greatherSoldProduct.mediaavs)) ||
			totalMediaavs === 0
		) {
			return 0;
		}

		const percentual =
			(parseFloat(greatherSoldProduct.mediaavs) / totalMediaavs) * 100;
		return percentual;
	};

	return {
		products,
		setProducts,
		isLoading,
		getGreatherSoldProduct,
		getProductIdByName,
		getImageByPath,
		getProductsById,
		allProducts,
		getGreatherProductPercentualChange,
		getProductsByArrayId,
	};
};
